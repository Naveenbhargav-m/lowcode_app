// events_engine.js

import { ApiClient, AppID } from "../api_manager/api_clients";
import { DynamicForm } from "../form_renderer/dynamic_form";
import { showBottomDrawer, showModal, showSideDrawer } from "../popup_models/popupmodels";
import { ActiveScreenView } from "../state/screen_state";

class EventsEngine {
    constructor() {
        this.context = {};
        this.actions = {
            show_form: this.showForm.bind(this),
            show_drawer: this.showDrawer.bind(this),
            navigate: this.navigate.bind(this),
            workflow: this.executeWorkflow.bind(this),
            query: this.executeQuery.bind(this),
            close_modal: this.closeModal.bind(this),
            notification: this.showNotification.bind(this),
            update_variable: this.updateVariable.bind(this)
        };
    }

    setContext(context) {
        this.context = { ...this.context, ...context };
    }

    async executeEvent(eventConfig, elementId, eventType, eventData = {}) {
        if (!eventConfig) return;

        const context = {
            ...this.context,
            elementId,
            eventType,
            eventData,
            event: eventData
        };

        try {
            // Execute custom code first
            let codeResults = {};
            if (eventConfig.code?.trim()) {
                codeResults = await this.executeCode(eventConfig.code, context);
            }

            // Execute actions
            const finalContext = { ...context, ...codeResults };
            if (eventConfig.actions) {
                await this.executeActions(eventConfig.actions, finalContext);
            }

        } catch (error) {
            console.error(`Event execution failed:`, error);
            await this.showNotification({ 
                message: 'Action failed. Please try again.', 
                type: 'error' 
            });
        }
    }

    async executeCode(code, context) {
        try {
            const contextKeys = Object.keys(context);
            const contextValues = Object.values(context);
            
            const wrappedCode = `
                try {
                    ${code}
                    return { result, data, actions };
                } catch (error) {
                    return { error: error.message };
                }
            `;

            const func = new Function(...contextKeys, wrappedCode);
            return await func(...contextValues) || {};
        } catch (error) {
            console.error('Code execution error:', error);
            return { error: error.message };
        }
    }

    async executeActions(actions, context) {
        const actionList = Array.isArray(actions) ? actions : [actions];
        
        for (const action of actionList) {
            try {
                await this.executeAction(action, context);
            } catch (error) {
                console.error('Action failed:', error);
                // Continue with other actions instead of stopping
            }
        }
    }

    async executeAction(action, context) {
        const actionType = action.action || action.type;
        const handler = this.actions[actionType];
        
        if (!handler) {
            throw new Error(`Unknown action: ${actionType}`);
        }

        return await handler(action, context);
    }

    // Action Handlers
    async showForm(config, context) {
        let form_ids = config["value"] || [];
        let modal = false;
        let drawer_type = "side";
        if (!form_ids?.length) {
            throw new Error('Form ID required');
        }

        const formId = form_ids[0].split('.')[1];
        if (!formId) {
            throw new Error('Invalid form ID format');
        }

        try {
            const response = await ApiClient.get(`${AppID}/public/_forms`, {
                query: { where: `id=${formId}` }
            });

            if (!response?.length) {
                throw new Error('Form not found');
            }

            const formConfig = response[0];
            const fields = formConfig.configs[ActiveScreenView.value];
            const submitActions = formConfig.configs.submit_actions;
            console.log("form config:",formConfig);
            const component = (
                <DynamicForm 
                    formConfig={fields}
                    onChange={(fieldId, value, newValues) => {
                        console.log("Form changed:", { fieldId, value });
                    }}
                    onSubmit={(values) => {
                        this.handleFormSubmit(values, submitActions, {
                            ...context,
                            formConfig,
                            formId
                        });
                    }}
                />
            );

            // Display form
            if (modal) {
                showModal(component);
            } else if (drawer_type === 'bottom') {
                showBottomDrawer(component);
            } else {
                showSideDrawer(component);
            }

        } catch (error) {
            console.error('Form display error:', error);
            throw error;
        }
    }

    async handleFormSubmit(formData, submitActions, context) {
      debugger;
        if (!submitActions) return;

        try {
            const submitContext = {
                ...context,
                formData,
                submittedAt: new Date().toISOString()
            };

            await this.executeActions(submitActions, submitContext);
            
            await this.showNotification({
                message: 'Form submitted successfully!',
                type: 'success'
            });

        } catch (error) {
            console.error('Form submission failed:', error);
            await this.showNotification({
                message: 'Form submission failed. Please try again.',
                type: 'error'
            });
            throw error;
        }
    }

    async executeWorkflow(config, context) {
        const { workflow_id, worflow_id, field_mapping = [], parameters = {} } = config;
        const workflowId = workflow_id || worflow_id;
        
        if (!workflowId) {
            throw new Error('Workflow ID required');
        }

        try {
            const mappedData = this.mapFields(field_mapping, context);
            const workflowData = { ...mappedData, ...parameters };
            console.log("mapped data:",mappedData);
            const response = await ApiClient.post(`${AppID}/workflows/${workflowId}/execute`, {
                data: workflowData,
                context
            });

            console.log('Workflow executed:', workflowId);
            return response;

        } catch (error) {
            console.error('Workflow execution failed:', error);
            throw error;
        }
    }

    mapFields(fieldMapping, context) {
        const mapped = {};
        const formData = context.formData || {};
        debugger;
        fieldMapping.forEach(mapping => {
            const { sourceField, targetField, type, value, userField } = mapping;
            let fieldValue = null;

            switch (type) {
                case 'source':
                    fieldValue = formData[sourceField];
                    break;
                case 'static':
                    fieldValue = value;
                    break;
                case 'user':
                    fieldValue = context.user?.[userField];
                    break;
                case 'context':
                    fieldValue = context[sourceField];
                    break;
            }

            if (fieldValue !== null && fieldValue !== undefined) {
                mapped[targetField] = fieldValue;
            }
        });

        return mapped;
    }

    async executeQuery(config, context) {
        const { table, operation = 'select', data = {}, conditions = {} } = config;
        
        if (!table) {
            throw new Error('Table name required');
        }

        try {
            const processedData = this.processContextVariables(data, context);
            const processedConditions = this.processContextVariables(conditions, context);
            const url = `${AppID}/data/${table}`;

            let response;
            switch (operation.toLowerCase()) {
                case 'select':
                case 'get':
                    response = await ApiClient.get(url, {
                        query: { where: this.buildWhereClause(processedConditions) }
                    });
                    break;
                case 'insert':
                case 'create':
                    response = await ApiClient.post(url, processedData);
                    break;
                case 'update':
                    response = await ApiClient.put(url, {
                        data: processedData,
                        where: processedConditions
                    });
                    break;
                case 'delete':
                    response = await ApiClient.delete(url, {
                        where: processedConditions
                    });
                    break;
                default:
                    throw new Error(`Unsupported operation: ${operation}`);
            }

            return response;

        } catch (error) {
            console.error('Query execution failed:', error);
            throw error;
        }
    }

    processContextVariables(data, context) {
        if (typeof data !== 'object' || !data) return data;

        const processed = {};
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'string' && value.startsWith('${') && value.endsWith('}')) {
                const variablePath = value.slice(2, -1);
                processed[key] = this.getNestedValue(context, variablePath);
            } else {
                processed[key] = value;
            }
        }
        return processed;
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    buildWhereClause(conditions) {
        if (!conditions || !Object.keys(conditions).length) return '';
        
        return Object.entries(conditions)
            .map(([key, value]) => `${key}='${value}'`)
            .join(' AND ');
    }

    async showDrawer(config, context) {
        console.log('Showing drawer:', config);
        // Implement drawer logic
    }

    async navigate(config, context) {
        const { page_id, route } = config;
        console.log('Navigating to:', page_id || route);
        // Implement navigation logic
    }

    async closeModal(config, context) {
        console.log('Closing modal:', config);
        // Implement modal close logic
    }

    async showNotification(config, context) {
        const { message, type = 'info', duration = 3000 } = config;
        
        console.log(`Notification [${type}]:`, message);
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 16px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        `;

        document.body.appendChild(notification);

        // Auto remove after duration
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, duration);
    }

    async updateVariable(config, context) {
        const { variable_name, value } = config;
        console.log('Updating variable:', variable_name, '=', value);
        this.context[variable_name] = value;
    }

    // Utility method for external use
    executeElementEvent(element, eventType, eventData = {}) {
        const eventConfig = element?.configs?.events?.[eventType];
        if (eventConfig) {
            this.executeEvent(eventConfig, element.id, eventType, eventData);
        }
    }
}

// Create and export singleton
export const eventsEngine = new EventsEngine();

// Convenience exports
export const executeElementEvent = (element, eventType, eventData) => {
    eventsEngine.executeElementEvent(element, eventType, eventData);
};

export const executeAction = (action, context) => {
    return eventsEngine.executeAction(action, context);
};

export const executeFormSubmitActions = (submitActions, formData, context) => {
    return eventsEngine.executeActions(submitActions, { ...context, formData });
};

export default EventsEngine;