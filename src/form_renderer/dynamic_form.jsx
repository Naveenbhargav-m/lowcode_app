import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  CheckboxInput, Column, DateInput, DateTimeInput, DualRangeSliderInput, 
  EmailInput, FileUploadInput, FormSteps, ImageSelectGrid, ImageUploadGrid, 
  LookupInput, MarkdownInput, MonthInput, MultiSelectInput, Panel, 
  PasswordInput, Row, SelectInput, TextareaInput, TextInput, TimeInput, WeekInput 
} from './components';
import { styles } from './styles';

// Autofill override styles
const autofillStyles = `
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  textarea:-webkit-autofill:active,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus,
  select:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: #000 !important;
    background-color: white !important;
    color: #000 !important;
  }
  
  input:-webkit-autofill::first-line,
  textarea:-webkit-autofill::first-line {
    color: #000 !important;
    font-family: inherit !important;
    font-size: inherit !important;
  }
`;

// Inject autofill styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = autofillStyles;
  document.head.appendChild(styleElement);
}

// Field type registry with default props
const FIELD_TYPES = {
  text: { component: TextInput, defaultProps: { type: 'text', placeholder: 'Enter text...' }},
  select: { component: SelectInput, defaultProps: { options: [], placeholder: 'Select an option...' }},
  checkbox: { component: CheckboxInput, defaultProps: { checked: false }},
  textarea: { component: TextareaInput, defaultProps: { rows: 4, placeholder: 'Enter text...' }},
  password: { component: PasswordInput, defaultProps: { type: 'password', placeholder: 'Enter password...' }},
  markdown: { component: MarkdownInput, defaultProps: { placeholder: 'Enter markdown text...' }},
  slider: { component: DualRangeSliderInput, defaultProps: { min: 0, max: 100, step: 1, defaultValue: 50 }},
  dual_slider: { component: DualRangeSliderInput, defaultProps: { min: 0, max: 100, step: 1, defaultValue: [25, 75] }},
  email: { component: EmailInput, defaultProps: { type: 'email', placeholder: 'Enter email address...' }},
  date: { component: DateInput, defaultProps: { placeholder: 'Select date...' }},
  date_time: { component: DateTimeInput, defaultProps: { placeholder: 'Select date and time...' }},
  time: { component: TimeInput, defaultProps: { placeholder: 'Select time...' }},
  month: { component: MonthInput, defaultProps: { placeholder: 'Select month...' }},
  week: { component: WeekInput, defaultProps: { placeholder: 'Select week...' }},
  multi_select: { component: MultiSelectInput, defaultProps: { options: [], placeholder: 'Select multiple options...' }},
  lookup: { component: LookupInput, defaultProps: { options: [], placeholder: 'Search and select...' }},
  file_upload: { component: FileUploadInput, defaultProps: { accept: '*/*', multiple: false }},
  image_upload_grid: { component: ImageUploadGrid, defaultProps: { maxFiles: 5, accept: 'image/*' }},
  image_select_grid: { component: ImageSelectGrid, defaultProps: { options: [], multiple: false }},
  row: { component: Row, defaultProps: { children: [] }},
  column: { component: Column, defaultProps: { children: [] }},
  panel: { component: Panel, defaultProps: { title: '', children: [] }},
  form_steps: { component: FormSteps, defaultProps: { steps: [], currentStep: 0 }}
};

const LAYOUT_TYPES = new Set(['row', 'column', 'panel']);

// Utility functions
const evaluateCondition = (condition, values) => {
  if (typeof condition === 'function') return condition(values);
  if (typeof condition !== 'object') return Boolean(condition);
  
  const { field, operator, value } = condition;
  const fieldValue = values[field];
  
  const operators = {
    eq: () => fieldValue === value,
    neq: () => fieldValue !== value,
    gt: () => fieldValue > value,
    gte: () => fieldValue >= value,
    lt: () => fieldValue < value,
    lte: () => fieldValue <= value,
    contains: () => fieldValue?.includes(value),
    startsWith: () => fieldValue?.startsWith(value),
    endsWith: () => fieldValue?.endsWith(value),
    empty: () => !fieldValue || fieldValue === '' || fieldValue.length === 0,
    notEmpty: () => fieldValue && fieldValue !== '' && fieldValue.length > 0,
    in: () => Array.isArray(value) && value.includes(fieldValue),
    nin: () => Array.isArray(value) && !value.includes(fieldValue),
    and: () => Array.isArray(value) && value.every(c => evaluateCondition(c, values)),
    or: () => Array.isArray(value) && value.some(c => evaluateCondition(c, values))
  };
  
  return operators[operator]?.() || false;
};

const executeActions = (actions, values, setValues, setErrors) => {
  if (!actions) return;
  
  const actionHandlers = {
    setValue: (action) => setValues(prev => ({
      ...prev,
      [action.targetField]: typeof action.value === 'function' ? action.value(prev) : action.value
    })),
    clearValue: (action) => setValues(prev => {
      const { [action.targetField]: _, ...rest } = prev;
      return rest;
    }),
    setError: (action) => setErrors(prev => ({ ...prev, [action.targetField]: action.message })),
    clearError: (action) => setErrors(prev => {
      const { [action.targetField]: _, ...rest } = prev;
      return rest;
    })
  };
  
  actions.forEach(action => {
    const handler = actionHandlers[action.type];
    if (handler) handler(action);
    else console.error(`Unknown action type: ${action.type}`);
  });
};

// Field validation
const validateField = (field, formValues, setErrors) => {
  if (!field.validation) return true;
  
  const value = formValues[field.id];
  const validationRules = {
    required: (rule) => !value || (typeof value === 'string' && !value.trim()) 
      ? rule.message || 'This field is required' : null,
    pattern: (rule) => value && !new RegExp(rule.pattern).test(value) 
      ? rule.message || 'Invalid format' : null,
    minLength: (rule) => value && value.length < rule.minLength 
      ? rule.message || `Minimum length is ${rule.minLength}` : null,
    maxLength: (rule) => value && value.length > rule.maxLength 
      ? rule.message || `Maximum length is ${rule.maxLength}` : null,
    min: (rule) => value && parseFloat(value) < rule.min 
      ? rule.message || `Minimum value is ${rule.min}` : null,
    max: (rule) => value && parseFloat(value) > rule.max 
      ? rule.message || `Maximum value is ${rule.max}` : null,
    custom: (rule) => typeof rule.custom === 'function' ? rule.custom(value, formValues) : null,
    condition: (rule) => evaluateCondition(rule.condition, formValues) 
      ? rule.message || 'Validation failed' : null
  };
  
  const errors = field.validation
    .map(rule => Object.keys(validationRules)
      .filter(key => rule[key] !== undefined)
      .map(key => validationRules[key](rule))
      .find(error => error)
    )
    .filter(Boolean);
  
  const hasError = errors.length > 0;
  setErrors(prev => ({ ...prev, [field.id]: hasError ? errors[0] : undefined }));
  return !hasError;
};

// Field renderer component
const FieldRenderer = ({ field, values, errors, onChange, onFocus, onBlur, fieldsConfig, renderField }) => {
  const isHidden = field.hidden && evaluateCondition(field.hidden, values);
  if (isHidden) return null;

  // Handle layout components
  if (LAYOUT_TYPES.has(field.type)) {
    const LayoutComponent = FIELD_TYPES[field.type].component;
    const childFields = (field.children || [])
      .map(childId => fieldsConfig.find(f => f.id === childId))
      .filter(Boolean);
    
    return (
      <LayoutComponent title={field.title} style={field.style} hidden={isHidden}>
        {childFields.map(childField => renderField(childField))}
      </LayoutComponent>
    );
  }

  // Handle regular fields
  const FieldComponent = FIELD_TYPES[field.type]?.component;
  if (!FieldComponent) {
    console.error(`Unknown field type: ${field.type}`);
    return null;
  }
  
  // Evaluate dynamic props
  const evaluatedProps = field.dynamicProps ? 
    Object.fromEntries(
      Object.entries(field.dynamicProps).map(([propName, condition]) => 
        [propName, evaluateCondition(condition, values)]
      )
    ) : {};
  
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
      hidden={isHidden}
      {...FIELD_TYPES[field.type].defaultProps}
      {...field.props}
      {...evaluatedProps}
    />
  );
};

// Main DynamicForm Component
function DynamicForm({ formConfig, onChange, onSubmit }) {
  if (!formConfig?.fields) return <div>Empty form</div>;
  
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [touched, setTouched] = useState({});
  
  // Initialize form with default values
  useEffect(() => {
    const initialValues = formConfig.fields.reduce((acc, field) => {
      if (field.defaultValue !== undefined) acc[field.id] = field.defaultValue;
      return acc;
    }, {});
    setValues(prev => ({ ...prev, ...initialValues }));
  }, [formConfig]);

  // Handle field change with callbacks
  const handleChange = useCallback((fieldId, value, event) => {
    setValues(prev => {
      const newValues = { ...prev, [fieldId]: value };
      const field = formConfig.fields.find(f => f.id === fieldId);
      
      // Execute field-specific actions
      if (field?.actions?.onChange) {
        executeActions(field.actions.onChange, newValues, setValues, setErrors);
      }
      
      // Validate on change if configured
      if (field?.validateOn?.includes('change')) {
        validateField(field, newValues, setErrors);
      }
      
      // Call parent onChange callback
      onChange?.(fieldId, value, newValues, event);
      
      return newValues;
    });
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [fieldId]: true }));
  }, [formConfig.fields, onChange]);

  // Handle field focus
  const handleFocus = useCallback((fieldId, event) => {
    const field = formConfig.fields.find(f => f.id === fieldId);
    if (field?.actions?.onFocus) {
      executeActions(field.actions.onFocus, values, setValues, setErrors);
    }
  }, [formConfig.fields, values]);

  // Handle field blur
  const handleBlur = useCallback((fieldId, event) => {
    const field = formConfig.fields.find(f => f.id === fieldId);
    
    setTouched(prev => ({ ...prev, [fieldId]: true }));
    
    if (field?.actions?.onBlur) {
      executeActions(field.actions.onBlur, values, setValues, setErrors);
    }
    
    if (field?.validateOn?.includes('blur')) {
      validateField(field, values, setErrors);
    }
  }, [formConfig.fields, values]);

  // Get fields for current step
  const getCurrentStepFields = useCallback(() => {
    if (!formConfig.steps?.length) return formConfig.fields;
    const currentStepConfig = formConfig.steps[currentStep];
    return formConfig.fields.filter(field => currentStepConfig.fields.includes(field.id));
  }, [formConfig.fields, formConfig.steps, currentStep]);

  // Validate step
  const validateStep = useCallback(() => {
    const currentStepFields = getCurrentStepFields();
    return currentStepFields.every(field => {
      if (field.hidden && evaluateCondition(field.hidden, values)) return true;
      return !field.validation || validateField(field, values, setErrors);
    });
  }, [getCurrentStepFields, values]);

  // Handle form submission
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    const isValid = formConfig.fields.every(field => 
      !field.validation || validateField(field, values, setErrors)
    );
    
    if (isValid) {
      // Call both form config and prop callbacks
      formConfig.onSubmit?.(values);
      onSubmit?.(values, e);
    } else {
      // Mark all fields as touched
      setTouched(Object.fromEntries(formConfig.fields.map(field => [field.id, true])));
    }
  }, [formConfig, values, onSubmit]);

  // Step navigation
  const handleNextStep = useCallback(() => {
    if (validateStep() && currentStep < (formConfig.steps?.length - 1 || 0)) {
      setCurrentStep(currentStep + 1);
    }
  }, [validateStep, currentStep, formConfig.steps]);

  const handlePrevStep = useCallback(() => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  // Render field function
  const renderField = useCallback((field) => (
    <FieldRenderer
      key={field.id}
      field={field}
      values={values}
      errors={errors}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      fieldsConfig={formConfig.fields}
      renderField={renderField}
    />
  ), [values, errors, handleChange, handleFocus, handleBlur, formConfig.fields]);

  // Get fields to render (excluding children of layout components)
  const fieldsToRender = useMemo(() => {
    const currentFields = getCurrentStepFields();
    const childrenIds = new Set(
      currentFields.flatMap(field => field.children || [])
    );
    return currentFields.filter(field => !childrenIds.has(field.id));
  }, [getCurrentStepFields]);

  const hasSteps = formConfig.steps?.length > 0;
  const isLastStep = currentStep >= (formConfig.steps?.length - 1 || 0);

  return (
    <div style={styles.layout.form}>
      {hasSteps && (
        <FormSteps
          steps={formConfig.steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      )}
      
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
        {fieldsToRender.map(renderField)}
        
        <div style={styles.base.buttonGroup}>
          {hasSteps ? (
            <>
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  style={{ ...styles.base.button, ...styles.base.secondaryButton }}
                >
                  Previous
                </button>
              )}
              
              {isLastStep ? (
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                  <button
                    type="submit"
                    style={{ ...styles.base.button, ...styles.base.primaryButton }}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleNextStep}
                  style={{ ...styles.base.button, ...styles.base.primaryButton }}
                >
                  Next
                </button>
              )}
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <button
                type="submit"
                style={{ ...styles.base.button, ...styles.base.primaryButton }}
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

export { DynamicForm };