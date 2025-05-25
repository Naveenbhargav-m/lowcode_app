import { useState, useEffect, useMemo } from 'react';
import { CheckboxInput, Column, DateInput, DateTimeInput, DualRangeSliderInput, EmailInput, FileUploadInput, FormSteps, ImageSelectGrid, ImageUploadGrid, LookupInput, MarkdownInput, MonthInput, MultiSelectInput, Panel, PasswordInput, Row, SelectInput, TextareaInput, TextInput, TimeInput, WeekInput } from './components';
import { styles } from './styles';
// Field type definitions with default props

  // Extended fieldTypes mapping
  const fieldTypes = {
    text: {
      component: TextInput,
      defaultProps: {
        type: 'text',
        placeholder: 'Enter text (key: text)...',
      }
    },
    select: {
      component: SelectInput,
      defaultProps: {
        options: [],
        placeholder: 'Select an option (key: select)...',
      }
    },
    checkbox: {
      component: CheckboxInput,
      defaultProps: {
        checked: false,
      }
    },
    textarea: {
      component: TextareaInput,
      defaultProps: {
        rows: 4,
        placeholder: 'Enter text (key: textarea)...',
      }
    },
    password: {
      component: PasswordInput,
      defaultProps: {
        type: 'password',
        placeholder: 'Enter password...',
      }
    },
    markdown: {
      component: MarkdownInput,
      defaultProps: {
        placeholder: 'Enter markdown text...',
      }
    },
    slider: {
      component: DualRangeSliderInput,
      defaultProps: {
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
      }
    },
    dual_slider: {
      component: DualRangeSliderInput,
      defaultProps: {
        min: 0,
        max: 100,
        step: 1,
        defaultValue: [25, 75],
      }
    },
    email: {
      component: EmailInput,
      defaultProps: {
        type: 'email',
        placeholder: 'Enter email address...',
      }
    },
    date: {
      component: DateInput,
      defaultProps: {
        placeholder: 'Select date...',
      }
    },
    date_time: {
      component: DateTimeInput,
      defaultProps: {
        placeholder: 'Select date and time...',
      }
    },
    time: {
      component: TimeInput,
      defaultProps: {
        placeholder: 'Select time...',
      }
    },
    month: {
      component: MonthInput,
      defaultProps: {
        placeholder: 'Select month...',
      }
    },
    week: {
      component: WeekInput,
      defaultProps: {
        placeholder: 'Select week...',
      }
    },
    multi_select: {
      component: MultiSelectInput,
      defaultProps: {
        options: [],
        placeholder: 'Select multiple options...',
      }
    },
    lookup: {
      component: LookupInput,
      defaultProps: {
        options: [],
        placeholder: 'Search and select...',
      }
    },
    file_upload: {
      component: FileUploadInput,
      defaultProps: {
        accept: '*/*',
        multiple: false,
      }
    },
    image_upload_grid: {
      component: ImageUploadGrid,
      defaultProps: {
        maxFiles: 5,
        accept: 'image/*',
      }
    },
    image_select_grid: {
      component: ImageSelectGrid,
      defaultProps: {
        options: [],
        multiple: false,
      }
    },
    row: {
      component: Row,
      defaultProps: {
        children: [],
      }
    },
    column: {
      component: Column,
      defaultProps: {
        children: [],
      }
    },
    panel: {
      component: Panel,
      defaultProps: {
        title: '',
        children: [],
      }
    },
    form_steps: {
      component: FormSteps,
      defaultProps: {
        steps: [],
        currentStep: 0,
      }
    }
  };

// Form Field Components
// Field Renderer Component
function FieldRenderer({ 
  field, 
  values, 
  errors, 
  onChange,
  onFocus,
  onBlur,
  fieldsConfig,
  renderField
}) {
  // If field should be hidden based on conditions, return null
  if (field.hidden && evaluateCondition(field.hidden, values)) {
    return null;
  }

  // If it's a container component (row, column, panel)
  if (['row', 'column', 'panel'].includes(field.type)) {
    const LayoutComponent = fieldTypes[field.type].component;
    const childFields = (field.children || []).map(childId => 
      fieldsConfig.find(f => f.id === childId)
    ).filter(Boolean);
    console.log("field in form renderer:", field);
    return (
      
      <LayoutComponent 
        title={field.title} 
        style={field.style}
        hidden={field.hidden && evaluateCondition(field.hidden, values)}
      >
        {childFields.map(childField => 
          renderField(childField, values, errors, onChange, onFocus, onBlur)
        )}
      </LayoutComponent>
    );
  }

  // Normal field rendering
  const FieldComponent = fieldTypes[field.type]?.component;
  
  if (!FieldComponent) {
    console.error(`Unknown field type: ${field.type}`);
    return null;
  }
  
  // Evaluate dynamic props based on other field values
  const evaluatedProps = {};
  if (field.dynamicProps) {
    Object.entries(field.dynamicProps).forEach(([propName, condition]) => {
      evaluatedProps[propName] = evaluateCondition(condition, values);
    });
  }
  console.log("field in form renderer:", field);
  return (
    <FieldComponent
      id={field.id}
      label={field.label}
      value={values[field.id]}
      checked={field.type === 'checkbox' ? values[field.id] : undefined}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      error={errors[field.id]}
      options={field.options}
      style={field.style}
      hidden={field.hidden && evaluateCondition(field.hidden, values)}
      {...fieldTypes[field.type].defaultProps}
      {...field.props}
      {...evaluatedProps}
    />
  );
}

// Main DynamicForm Component
function DynamicForm({ formConfig }) {
  console.log("new form config:",formConfig);
 if(formConfig.fields === undefined) {
    return <div>Empty form</div>
 }
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [touched, setTouched] = useState({});
  
  // Initialize form with default values
  useEffect(() => {
    const initialValues = {};
    formConfig.fields.forEach(field => {
      if (field.defaultValue !== undefined) {
        initialValues[field.id] = field.defaultValue;
      }
    });
    setValues(prev => ({ ...prev, ...initialValues }));
  }, [formConfig]);

  // Handle field change
  const handleChange = (fieldId, value, event) => {
    setValues(prev => {
      const newValues = { ...prev, [fieldId]: value };
      
      // Execute field change actions
      const field = formConfig.fields.find(f => f.id === fieldId);
      if (field?.actions?.onChange) {
        executeActions(field.actions.onChange, newValues, setValues, setErrors);
      }
      
      // Check if we need to validate on change
      if (field?.validateOn?.includes('change')) {
        validateField(field, newValues);
      }
      
      return newValues;
    });
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [fieldId]: true
    }));
  };

  // Handle field focus
  const handleFocus = (fieldId, event) => {
    const field = formConfig.fields.find(f => f.id === fieldId);
    if (field?.actions?.onFocus) {
      executeActions(field.actions.onFocus, values, setValues, setErrors);
    }
  };

  // Handle field blur
  const handleBlur = (fieldId, event) => {
    const field = formConfig.fields.find(f => f.id === fieldId);
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [fieldId]: true
    }));
    
    // Execute blur actions
    if (field?.actions?.onBlur) {
      executeActions(field.actions.onBlur, values, setValues, setErrors);
    }
    
    // Validate on blur if configured
    if (field?.validateOn?.includes('blur')) {
      validateField(field, values);
    }
  };

  // Validate a single field
  const validateField = (field, formValues) => {
    if (!field.validation) return true;
    
    let fieldErrors = [];
    
    field.validation.forEach(rule => {
      const value = formValues[field.id];
      
      if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
        fieldErrors.push(rule.message || 'This field is required');
      }
      
      if (rule.pattern && value) {
        const regex = new RegExp(rule.pattern);
        if (!regex.test(value)) {
          fieldErrors.push(rule.message || 'Invalid format');
        }
      }
      
      if (rule.minLength && value && value.length < rule.minLength) {
        fieldErrors.push(rule.message || `Minimum length is ${rule.minLength}`);
      }
      
      if (rule.maxLength && value && value.length > rule.maxLength) {
        fieldErrors.push(rule.message || `Maximum length is ${rule.maxLength}`);
      }
      
      if (rule.min && value && parseFloat(value) < rule.min) {
        fieldErrors.push(rule.message || `Minimum value is ${rule.min}`);
      }
      
      if (rule.max && value && parseFloat(value) > rule.max) {
        fieldErrors.push(rule.message || `Maximum value is ${rule.max}`);
      }
      
      if (rule.custom && typeof rule.custom === 'function') {
        const customError = rule.custom(value, formValues);
        if (customError) {
          fieldErrors.push(customError);
        }
      }
      
      if (rule.condition && evaluateCondition(rule.condition, formValues)) {
        fieldErrors.push(rule.message || 'Validation failed');
      }
    });
    
    setErrors(prev => ({
      ...prev,
      [field.id]: fieldErrors.length > 0 ? fieldErrors[0] : undefined
    }));
    
    return fieldErrors.length === 0;
  };

  // Validate all fields in current step
  const validateStep = () => {
    const currentStepFields = getCurrentStepFields();
    let isValid = true;
    
    currentStepFields.forEach(field => {
      // Skip validation for hidden fields
      if (field.hidden && evaluateCondition(field.hidden, values)) {
        return;
      }
      
      if (field.validation) {
        const fieldValid = validateField(field, values);
        if (!fieldValid) {
          isValid = false;
        }
      }
    });
    
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    formConfig.fields.forEach(field => {
      if (field.validation) {
        const fieldValid = validateField(field, values);
        if (!fieldValid) {
          isValid = false;
        }
      }
    });
    
    if (isValid) {
      formConfig.onSubmit?.(values);
    } else {
      // Mark all fields as touched
      const allTouched = {};
      formConfig.fields.forEach(field => {
        allTouched[field.id] = true;
      });
      setTouched(allTouched);
    }
  };

  // Get fields for current step
  const getCurrentStepFields = () => {
    if (!formConfig.steps || formConfig.steps.length === 0) {
      return formConfig.fields;
    }
    
    const currentStepConfig = formConfig.steps[currentStep];
    return formConfig.fields.filter(field => 
      currentStepConfig.fields.includes(field.id)
    );
  };

  // Handle step navigation
  const handleNextStep = () => {
    if (validateStep()) {
      if (currentStep < (formConfig.steps?.length - 1 || 0)) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render a field recursively
  const renderField = (field, values, errors, onChange, onFocus, onBlur) => {
    return (
      <FieldRenderer
        key={field.id}
        field={field}
        values={values}
        errors={errors}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        fieldsConfig={formConfig.fields}
        renderField={renderField}
      />
    );
  };

  // Get current fields to render
  const fieldsToRender = useMemo(() => {
    const currentFields = getCurrentStepFields();
    
    // Filter out any fields that are children of layout components
    // as they will be rendered by their parent
    const childrenIds = new Set();
    currentFields.forEach(field => {
      if (field.children) {
        field.children.forEach(id => childrenIds.add(id));
      }
    });
    
    return currentFields.filter(field => !childrenIds.has(field.id));
  }, [formConfig, formConfig.fields,formConfig.steps, currentStep]);

  return (
    <div style={styles.layout.form}>
      {formConfig.steps && formConfig.steps.length > 0 && (
        <FormSteps
          steps={formConfig.steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      )}
      
      <form style={{display:"flex", "flexDirection": "column"}} onSubmit={handleSubmit}>
        {fieldsToRender.map(field => 
          renderField(field, values, errors, handleChange, handleFocus, handleBlur)
        )}
        
        <div style={styles.base.buttonGroup}>
          {formConfig.steps && formConfig.steps.length > 0 && (
            <>
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  style={{...styles.base.button, ...styles.base.secondaryButton}}
                >
                  Previous
                </button>
              )}
              
              {currentStep < formConfig.steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  style={{...styles.base.button, ...styles.base.primaryButton}}
                >
                  Next
                </button>
              ) : (
                <div style={{display:'flex', "flexDirection": "row-reverse"}}>
                <button
                  type="submit"
                  style={{...styles.base.button, ...styles.base.primaryButton}}
                >
                  Submit
                </button>
                </div>
              )}
            </>
          )}
          
          {(!formConfig.steps || formConfig.steps.length === 0) && (
          <div style={{display:'flex', justifyContent: 'flex-end', width:"100%"}}>
          <button
            type="submit"
            style={{...styles.base.button, ...styles.base.primaryButton}}
          >
            Submit
          </button>
        </div>
          )}
        </div>
      </form>
    </div>
  );
}

// Helper functions
function evaluateCondition(condition, values) {
  if (typeof condition === 'function') {
    return condition(values);
  }
  
  if (typeof condition === 'object') {
    const { field, operator, value } = condition;
    const fieldValue = values[field];
    
    switch (operator) {
      case 'eq':
        return fieldValue === value;
      case 'neq':
        return fieldValue !== value;
      case 'gt':
        return fieldValue > value;
      case 'gte':
        return fieldValue >= value;
      case 'lt':
        return fieldValue < value;
      case 'lte':
        return fieldValue <= value;
      case 'contains':
        return fieldValue?.includes(value);
      case 'startsWith':
        return fieldValue?.startsWith(value);
      case 'endsWith':
        return fieldValue?.endsWith(value);
      case 'empty':
        return !fieldValue || fieldValue === '' || fieldValue.length === 0;
      case 'notEmpty':
        return fieldValue && fieldValue !== '' && fieldValue.length > 0;
      case 'in':
        return Array.isArray(value) && value.includes(fieldValue);
      case 'nin':
        return Array.isArray(value) && !value.includes(fieldValue);
      case 'and':
        return Array.isArray(value) && value.every(c => evaluateCondition(c, values));
      case 'or':
        return Array.isArray(value) && value.some(c => evaluateCondition(c, values));
      default:
        return false;
    }
  }
  
  return Boolean(condition);
}

function executeActions(actions, values, setValues, setErrors) {
  if (!actions) return;
  
  // Execute each action
  actions.forEach(action => {
    switch (action.type) {
      case 'setValue':
        setValues(prev => ({
          ...prev,
          [action.targetField]: 
            typeof action.value === 'function' 
              ? action.value(prev) 
              : action.value
        }));
        break;
      case 'clearValue':
        setValues(prev => {
          const newValues = { ...prev };
          delete newValues[action.targetField];
          return newValues;
        });
        break;
      case 'setError':
        setErrors(prev => ({
          ...prev,
          [action.targetField]: action.message
        }));
        break;
      case 'clearError':
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[action.targetField];
          return newErrors;
        });
        break;
      default:
        console.error(`Unknown action type: ${action.type}`);
    }
  });
}

// Example of usage
function FormBuilderDemo() {
  const exampleFormConfig = {
    fields: [
      {
        id: 'personalInfo',
        type: 'panel',
        title: 'Personal Information',
        children: ['firstName', 'lastName', 'email'],
        style: {
          container: {
            backgroundColor: '#f0f9ff',
            borderLeft: '4px solid #3b82f6',
          }
        }
      },
      {
        id: 'firstName',
        type: 'text',
        label: 'First Name',
        defaultValue: '',
        validation: [
          { required: true, message: 'First name is required' },
          { minLength: 2, message: 'First name must be at least 2 characters' }
        ],
        validateOn: ['blur', 'submit'],
        props: {
          placeholder: 'Enter your first name'
        }
      },
      {
        id: 'lastName',
        type: 'text',
        label: 'Last Name',
        defaultValue: '',
        validation: [
          { required: true, message: 'Last name is required' }
        ],
        validateOn: ['blur', 'submit'],
        props: {
          placeholder: 'Enter your last name'
        }
      },
      {
        id: 'email',
        type: 'text',
        label: 'Email',
        defaultValue: '',
        validation: [
          { required: true, message: 'Email is required' },
          { 
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', 
            message: 'Please enter a valid email address' 
          }
        ],
        validateOn: ['blur', 'submit'],
        props: {
          type: 'email',
          placeholder: 'Enter your email address'
        }
      },
      {
        id: 'addressRow',
        type: 'row',
        children: ['addressColumn1', 'addressColumn2'],
      },
      {
        id: 'addressColumn1',
        type: 'column',
        children: ['address', 'city'],
      },
      {
        id: 'addressColumn2',
        type: 'column',
        children: ['state', 'zip'],
      },
      {
        id: 'address',
        type: 'text',
        label: 'Address',
        defaultValue: '',
        props: {
          placeholder: 'Enter your street address'
        }
      },
      {
        id: 'city',
        type: 'text',
        label: 'City',
        defaultValue: '',
        props: {
          placeholder: 'Enter your city'
        }
      },
      {
        id: 'state',
        type: 'select',
        label: 'State',
        defaultValue: '',
        options: [
          { value: 'CA', label: 'California' },
          { value: 'NY', label: 'New York' },
          { value: 'TX', label: 'Texas' },
          { value: 'FL', label: 'Florida' }
        ],
        props: {
          placeholder: 'Select your state'
        }
      },
      {
        id: 'zip',
        type: 'text',
        label: 'ZIP Code',
        defaultValue: '',
        validation: [
          { pattern: '^\\d{5}(-\\d{4})?, message: "Please enter a valid ZIP code"' }
        ],
        validateOn: ['blur', 'submit'],
        props: {
          placeholder: 'Enter ZIP code'
        }
      },
      {
        id: 'hasMailingAddress',
        type: 'checkbox',
        label: 'Mailing address is different from residential address',
        defaultValue: false,
        actions: {
          onChange: [
            {
              type: 'setValue',
              targetField: 'mailingAddressPanel',
              value: (values) => values.hasMailingAddress
            }
          ]
        }
      },
      {
        id: 'mailingAddressPanel',
        type: 'panel',
        title: 'Mailing Address',
        children: ['mailingAddressRow'],
        hidden: { field: 'hasMailingAddress', operator: 'neq', value: true },
        style: {
          container: {
            backgroundColor: '#fef2f2',
            borderLeft: '4px solid #ef4444',
          }
        }
      },
      {
        id: 'mailingAddressRow',
        type: 'row',
        children: ['mailingColumn1', 'mailingColumn2'],
        hidden: { field: 'hasMailingAddress', operator: 'neq', value: true }
      },
      {
        id: 'mailingColumn1',
        type: 'column',
        children: ['mailingAddress', 'mailingCity'],
        hidden: { field: 'hasMailingAddress', operator: 'neq', value: true }
      },
      {
        id: 'mailingColumn2',
        type: 'column',
        children: ['mailingState', 'mailingZip'],
        hidden: { field: 'hasMailingAddress', operator: 'neq', value: true }
      },
      {
        id: 'mailingAddress',
        type: 'text',
        label: 'Mailing Address',
        defaultValue: '',
        hidden: { field: 'hasMailingAddress', operator: 'neq', value: true },
        props: {
          placeholder: 'Enter your mailing address'
        }
      },
      {
        id: 'mailingCity',
        type: 'text',
        label: 'City',
        defaultValue: '',
        hidden: { field: 'hasMailingAddress', operator: 'neq', value: true },
        props: {
          placeholder: 'Enter your city'
        }
      },
      {
        id: 'mailingState',
        type: 'select',
        label: 'State',
        defaultValue: '',
        hidden: { field: 'hasMailingAddress', operator: 'neq', value: true },
        options: [
          { value: 'CA', label: 'California' },
          { value: 'NY', label: 'New York' },
          { value: 'TX', label: 'Texas' },
          { value: 'FL', label: 'Florida' }
        ],
        props: {
          placeholder: 'Select your state'
        }
      },
      {
        id: 'mailingZip',
        type: 'text',
        label: 'ZIP Code',
        defaultValue: '',
        hidden: { field: 'hasMailingAddress', operator: 'neq', value: true },
        validation: [
          { pattern: '^\\d{5}(-\\d{4})?, message: Please enter a valid ZIP code' }
        ],
        validateOn: ['blur', 'submit'],
        props: {
          placeholder: 'Enter ZIP code'
        }
      },
      {
        id: 'comments',
        type: 'textarea',
        label: 'Additional Comments',
        defaultValue: '',
        props: {
          placeholder: 'Any additional information you would like to share',
          rows: 4
        },
        style: {
          input: {
            minHeight: '100px'
          }
        }
      },
      {
        id: 'subscribe',
        type: 'checkbox',
        label: 'Subscribe to newsletter',
        defaultValue: false,
        actions: {
          onChange: [
            {
              type: 'setValue',
              targetField: 'frequency',
              value: (values) => values.subscribe ? 'weekly' : ''
            }
          ]
        }
      },
      {
        id: 'frequency',
        type: 'select',
        label: 'Newsletter Frequency',
        defaultValue: '',
        hidden: { field: 'subscribe', operator: 'neq', value: true },
        options: [
          { value: 'daily', label: 'Daily' },
          { value: 'weekly', label: 'Weekly' },
          { value: 'monthly', label: 'Monthly' }
        ],
        props: {
          placeholder: 'Select frequency'
        }
      }
    ],
    steps: [
      {
        title: 'Personal Info',
        fields: ['personalInfo', 'firstName', 'lastName', 'email']
      },
      {
        title: 'Address',
        fields: ['addressRow', 'addressColumn1', 'addressColumn2', 'address', 'city', 'state', 'zip', 'hasMailingAddress', 'mailingAddressPanel', 'mailingAddressRow', 'mailingColumn1', 'mailingColumn2', 'mailingAddress', 'mailingCity', 'mailingState', 'mailingZip']
      },
      {
        title: 'Preferences',
        fields: ['comments', 'subscribe', 'frequency']
      }
    ],
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
      alert('Form submitted successfully!');
    }
  };

  return (
    <DynamicForm formConfig={exampleFormConfig} />
  );
}

// Render the form builder demo
export  {FormBuilderDemo, DynamicForm};