// events_engine.js

class EventsEngine {
    constructor() {
      this.actionHandlers = new Map();
      this.context = {}; // Global context for code execution
      this.setupDefaultHandlers();
    }
  
    // Register action handlers
    registerActionHandler(actionType, handler) {
      this.actionHandlers.set(actionType, handler);
    }
  
    // Setup default action handlers
    setupDefaultHandlers() {
      this.registerActionHandler('show_form', this.showForm.bind(this));
      this.registerActionHandler('show_drawer', this.showDrawer.bind(this));
      this.registerActionHandler('navigate_page', this.navigatePage.bind(this));
      this.registerActionHandler('refresh_element', this.refreshElement.bind(this));
      this.registerActionHandler('trigger_workflow', this.triggerWorkflow.bind(this));
      this.registerActionHandler('close_modal', this.closeModal.bind(this));
      this.registerActionHandler('update_variable', this.updateVariable.bind(this));
    }
  
    // Set global context for code execution
    setContext(context) {
      this.context = { ...this.context, ...context };
    }
  
    // Execute event with actions and code
    async executeEvent(eventConfig, elementId, eventType, eventData = {}) {
      if (!eventConfig) return;
  
      const { actions = [], code = '' } = eventConfig;
      
      // Enhanced context with event data
      const executionContext = {
        ...this.context,
        elementId,
        eventType,
        eventData,
        event: eventData
      };
  
      try {
        let codeResults = {};
        
        // Execute custom code first if present
        if (code && code.trim() && code.length > 0) {
          codeResults = await this.executeCode(code, executionContext);
        }
  
        // Merge code results into context
        const finalContext = { ...executionContext, ...codeResults };
  
        // Execute actions
        for (const action of actions) {
          await this.executeAction(action, finalContext);
        }
  
      } catch (error) {
        console.error(`Error executing event ${eventType} for element ${elementId}:`, error);
        this.handleError(error, elementId, eventType);
      }
    }
  
    // Execute custom code using Function constructor
    async executeCode(code, context) {
      try {
        // Create a safe function with context variables as parameters
        const contextKeys = Object.keys(context);
        const contextValues = Object.values(context);
        
        // Wrap code to return an object with results
        const wrappedCode = `
          try {
            ${code}
            // Return any variables that might have been created
            return {
              ...(typeof result !== 'undefined' ? { result } : {}),
              ...(typeof actions !== 'undefined' ? { actions } : {}),
              ...(typeof data !== 'undefined' ? { data } : {})
            };
          } catch (error) {
            console.error('Code execution error:', error);
            return { error: error.message };
          }
        `;
  
        const func = new Function(...contextKeys, wrappedCode);
        const results = await func(...contextValues);
        
        return results || {};
      } catch (error) {
        console.error('Code compilation error:', error);
        return { error: error.message };
      }
    }
  
    // Execute individual action
    async executeAction(action, context) {
      const { type, value, ...actionConfig } = action;
      
      const handler = this.actionHandlers.get(type);
      if (!handler) {
        console.warn(`No handler found for action type: ${type}`);
        return;
      }
  
      try {
        await handler(value, actionConfig, context);
      } catch (error) {
        console.error(`Error executing action ${type}:`, error);
        throw error;
      }
    }
  
    // Default action handlers
    async showForm(formIds, config, context) {
      console.log('Showing form:', formIds, config);
      // Implement your form showing logic here
      // Example: this.formManager.showForm(formIds[0], config.modal);
    }
  
    async showDrawer(drawerId, config, context) {
      console.log('Showing drawer:', drawerId, config);
      // Implement your drawer showing logic here
    }
  
    async navigatePage(pageId, config, context) {
      console.log('Navigating to page:', pageId, config);
      // Implement your navigation logic here
    }
  
    async refreshElement(elementId, config, context) {
      console.log('Refreshing element:', elementId, config);
      // Implement your element refresh logic here
    }
  
    async triggerWorkflow(workflowId, config, context) {
      console.log('Triggering workflow:', workflowId, config);
      // Implement your workflow triggering logic here
    }
  
    async closeModal(modalId, config, context) {
      console.log('Closing modal:', modalId, config);
      // Implement your modal closing logic here
    }
  
    async updateVariable(variableName, config, context) {
      console.log('Updating variable:', variableName, config);
      // Implement your variable update logic here
    }
  
    // Error handling
    handleError(error, elementId, eventType) {
      // Implement your error handling strategy
      console.error(`Event execution failed:`, {
        elementId,
        eventType,
        error: error.message,
        stack: error.stack
      });
      
      // You might want to show user-friendly error messages
      // or trigger error reporting here
    }
  
    // Utility method to execute events from element configs
    executeElementEvent(element, eventType, eventData = {}) {
      const eventConfig = element?.configs?.events?.[eventType];
      if (eventConfig) {
        this.executeEvent(eventConfig, element.id, eventType, eventData);
      }
    }
  }
  
  // Create singleton instance
  export const eventsEngine = new EventsEngine();
  
  // Convenience function for easy access
  export const executeElementEvent = (element, eventType, eventData) => {
    eventsEngine.executeElementEvent(element, eventType, eventData);
  };
  
  export default EventsEngine;