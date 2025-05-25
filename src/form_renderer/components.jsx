import { useState } from "preact/hooks";
import { styles } from "./styles";
import { useRef } from 'react';

// fields List:
/*
 TextInput
 SelectInput
 CheckboxInput
 TextareaInput
 Row
 Column
 Panel
 FormSteps
 PasswordInput
 MarkdownInput
 RangesliderInput.
 DualRangeSliderInput.
 EmailInput.
 DateInput.
 DateTimeInput.
 TimeInput.
 MonthInput.
 WeekInput
 MultiSelectInput.
 LookupInput.
 FileUploadInput.
 ImageUploadGrid.
 ImageSelectGrid.
*/

export function TextInput({ 
    id, 
    label, 
    value, 
    onChange, 
    onFocus, 
    onBlur, 
    error, 
    style = {}, 
    hidden = false,
    ...props 
  }) {
    const [focused, setFocused] = useState(false);
    
    if (hidden) return null;
    
    return (
      <div style={{...styles.base.field, ...style["container"]}}>
        {label && <label htmlFor={id} style={{...styles.base.label, ...style["label"]}}>{label}</label>}
        <input
          id={id}
          value={value || ''}
          // @ts-ignore
          onChange={(e) => onChange(id, e.target.value, e)}
          onFocus={(e) => {
            setFocused(true);
            onFocus && onFocus(id, e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur && onBlur(id, e);
          }}
          style={{
            ...styles.base.input,
            ...(focused ? styles.base.focused : {}),
            ...(error ? styles.base.error : {}),
            ...style["input"]
          }}
          {...props}
        />
        {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
      </div>
    );
  }
  
  export function SelectInput({ 
    id, 
    label, 
    value, 
    options = [], 
    onChange, 
    onFocus, 
    onBlur, 
    error, 
    style = {}, 
    hidden = false,
    ...props 
  }) {
    const [focused, setFocused] = useState(false);
    
    if (hidden) return null;
    
    return (
      <div style={{...styles.base.field, ...style["contianer"]}}>
        {label && <label htmlFor={id} style={{...styles.base.label, ...style["label"]}}>{label}</label>}
        <select
          id={id}
          value={value || ''}
          onChange={(e) => onChange(id, e.target["value"], e)}
          onFocus={(e) => {
            setFocused(true);
            onFocus && onFocus(id, e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur && onBlur(id, e);
          }}
          style={{
            ...styles.base.select,
            ...(focused ? styles.base.focused : {}),
            ...(error ? styles.base.error : {}),
            ...style["input"]
          }}
          {...props}
        >
          <option value="">{props.placeholder || 'Select an option...'}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
      </div>
    );
  }
  
  export function CheckboxInput({ 
    id, 
    label, 
    checked, 
    onChange, 
    onFocus, 
    onBlur, 
    error, 
    style = {}, 
    hidden = false,
    ...props 
  }) {
    if (hidden) return null;
    
    return (
      <div style={{...styles.base.field, ...style["container"]}}>
        <div style={{...styles.base.checkbox}}>
          <input
            id={id}
            type="checkbox"
            checked={checked || false}
            onChange={(e) => onChange(id, e.target["checked"], e)}
            onFocus={(e) => onFocus && onFocus(id, e)}
            onBlur={(e) => onBlur && onBlur(id, e)}
            style={{...styles.base.checkboxInput, ...style["input"]}}
            {...props}
          />
          {label && <label htmlFor={id} style={{...styles.base.label, margin: 0, ...style["label"]}}>{label}</label>}
        </div>
        {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
      </div>
    );
  }
  
  export function TextareaInput({ 
    id, 
    label, 
    value, 
    onChange, 
    onFocus, 
    onBlur, 
    error, 
    style = {}, 
    hidden = false,
    ...props 
  }) {
    const [focused, setFocused] = useState(false);
    
    if (hidden) return null;
    
    return (
      <div style={{...styles.base.field, ...style["container"]}}>
        {label && <label htmlFor={id} style={{...styles.base.label, ...style["label"]}}>{label}</label>}
        <textarea
          id={id}
          value={value || ''}
          onChange={(e) => onChange(id, e.target["value"], e)}
          onFocus={(e) => {
            setFocused(true);
            onFocus && onFocus(id, e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur && onBlur(id, e);
          }}
          style={{
            ...styles.base.input,
            ...(focused ? styles.base.focused : {}),
            ...(error ? styles.base.error : {}),
            ...style["input"]
          }}
          {...props}
        />
        {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
      </div>
    );
  }
  
  // Layout Components
  export function Row({ children, style = {}, hidden = false }) {
    if (hidden) return null;
    
    return (
      <div style={{...styles.layout.row, ...style}}>
        {children}
      </div>
    );
  }
  
  export function Column({ children, style = {}, hidden = false }) {
    if (hidden) return null;
    
    return (
      <div style={{...styles.layout.column, ...style["container"]}}>
        {children}
      </div>
    );
  }
  
  export function Panel({ title, children, style = {}, hidden = false }) {
    if (hidden) return null;
    
    return (
      <div style={{...styles.layout.panel, ...style["container"]}}>
        {title && <h3 style={{margin: '0 0 12px 0', fontSize: '16px', ...style["label"]}}>{title}</h3>}
        <div style={{...style["input"]}}>
          {children}
        </div>
      </div>
    );
  }
  
  // Form Steps Component
  export function FormSteps({ steps, currentStep, onStepChange, style = {} }) {
    return (
      <div style={{...styles.layout.steps, ...style["container"]}}>
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => onStepChange(index)}
            style={{
              ...styles.layout.step,
              ...(index === currentStep 
                ? styles.layout.activeStep 
                : index < currentStep 
                  ? styles.layout.completedStep 
                  : styles.layout.inactiveStep),
              ...style["input"]
            }}
          >
            {step.title}
          </button>
        ))}
      </div>
    );
  }
  




// Password Input Component
export function PasswordInput({ 
  id, 
  label, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  error, 
  style = {}, 
  hidden = false,
  showToggle = true,
  ...props 
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  if (hidden) return null;
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && <label htmlFor={id} style={{...styles.base.label, ...style["label"]}}>{label}</label>}
      <div style={{position: 'relative'}}>
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value || ''}
          onChange={(e) => onChange(id, e.target["value"], e)}
          onFocus={(e) => {
            setFocused(true);
            onFocus && onFocus(id, e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur && onBlur(id, e);
          }}
          style={{
            ...styles.base.input,
            ...(focused ? styles.base.focused : {}),
            ...(error ? styles.base.error : {}),
            ...(showToggle ? {paddingRight: '40px'} : {}),
            ...style["input"]
          }}
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}

// Markdown Editor Component
export function MarkdownInput({ 
  id, 
  label, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  error, 
  style = {}, 
  hidden = false,
  showPreview = true,
  ...props 
}) {
  const [focused, setFocused] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');
  
  if (hidden) return null;
  
  const insertMarkdown = (syntax) => {
    const textarea = document.getElementById(`${id}-textarea`);
    if (textarea) {
      const start = textarea["selectionStart"];
      const end = textarea["selectionEnd"];
      const text = textarea["value"];
      const before = text.substring(0, start);
      const selected = text.substring(start, end);
      const after = text.substring(end);
      
      let newText;
      switch (syntax) {
        case 'bold':
          newText = `${before}**${selected || 'bold text'}**${after}`;
          break;
        case 'italic':
          newText = `${before}_${selected || 'italic text'}_${after}`;
          break;
        case 'heading':
          newText = `${before}# ${selected || 'Heading'}${after}`;
          break;
        case 'link':
          newText = `${before}[${selected || 'link text'}](url)${after}`;
          break;
        case 'code':
          newText = `${before}\`${selected || 'code'}\`${after}`;
          break;
        case 'list':
          newText = `${before}- ${selected || 'list item'}${after}`;
          break;
        default:
          newText = text;
      }
      
      onChange(id, newText);
      setTimeout(() => {
        textarea.focus();
        // @ts-ignore
        textarea.setSelectionRange(start + syntax.length + 2, start + syntax.length + 2);
      }, 0);
    }
  };
  
  const renderMarkdown = (text) => {
    return text
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\_(.*?)\_/g, '<em>$1</em>')
      .replace(/\`(.*?)\`/g, '<code>$1</code>')
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\n/g, '<br>');
  };
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && <label style={{...styles.base.label, ...style["label"]}}>{label}</label>}
      
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        ...(focused ? styles.base.focused : {}),
        ...(error ? styles.base.error : {})
      }}>
        {showPreview && (
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #eee'
          }}>
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: activeTab === 'edit' ? '#f8f9fa' : 'transparent',
                borderBottom: activeTab === 'edit' ? '2px solid #007bff' : 'none',
                cursor: 'pointer'
              }}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: activeTab === 'preview' ? '#f8f9fa' : 'transparent',
                borderBottom: activeTab === 'preview' ? '2px solid #007bff' : 'none',
                cursor: 'pointer'
              }}
            >
              Preview
            </button>
          </div>
        )}
        
        {(!showPreview || activeTab === 'edit') && (
          <>
            <div style={{
              padding: '8px',
              borderBottom: '1px solid #eee',
              display: 'flex',
              gap: '4px',
              flexWrap: 'wrap'
            }}>
              <button type="button" onClick={() => insertMarkdown('bold')} style={{padding: '4px 8px', border: '1px solid #ccc', background: 'white', borderRadius: '3px'}}>Bold</button>
              <button type="button" onClick={() => insertMarkdown('italic')} style={{padding: '4px 8px', border: '1px solid #ccc', background: 'white', borderRadius: '3px'}}>Italic</button>
              <button type="button" onClick={() => insertMarkdown('heading')} style={{padding: '4px 8px', border: '1px solid #ccc', background: 'white', borderRadius: '3px'}}>H1</button>
              <button type="button" onClick={() => insertMarkdown('link')} style={{padding: '4px 8px', border: '1px solid #ccc', background: 'white', borderRadius: '3px'}}>Link</button>
              <button type="button" onClick={() => insertMarkdown('code')} style={{padding: '4px 8px', border: '1px solid #ccc', background: 'white', borderRadius: '3px'}}>Code</button>
              <button type="button" onClick={() => insertMarkdown('list')} style={{padding: '4px 8px', border: '1px solid #ccc', background: 'white', borderRadius: '3px'}}>List</button>
            </div>
            
            <textarea
              id={`${id}-textarea`}
              value={value || ''}
              onChange={(e) => onChange(id, e.target["value"], e)}
              onFocus={(e) => {
                setFocused(true);
                onFocus && onFocus(id, e);
              }}
              onBlur={(e) => {
                setFocused(false);
                onBlur && onBlur(id, e);
              }}
              placeholder="Enter markdown text..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '12px',
                border: 'none',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'monospace',
                ...style["input"]
              }}
              {...props}
            />
          </>
        )}
        
        {showPreview && activeTab === 'preview' && (
          <div
            style={{
              minHeight: '120px',
              padding: '12px',
              backgroundColor: '#fafafa'
            }}
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(value || 'Nothing to preview...')
            }}
          />
        )}
      </div>
      
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}

// Range Slider Component
export function RangeSliderInput({ 
  id, 
  label, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  error, 
  style = {}, 
  hidden = false,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  ...props 
}) {
  const [focused, setFocused] = useState(false);
  
  if (hidden) return null;
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
          <label htmlFor={id} style={{...styles.base.label, margin: 0, ...style["label"]}}>{label}</label>
          {showValue && (
            <span style={{fontSize: '14px', color: '#666', fontWeight: 'bold'}}>
              {value || min}
            </span>
          )}
        </div>
      )}
      
      <input
        id={id}
        type="range"
        // @ts-ignore
        min={min}
        // @ts-ignore
        max={max}
        step={step}
        value={value || min}
        onChange={(e) => onChange(id, Number(e.target["value"]), e)}
        onFocus={(e) => {
          setFocused(true);
          onFocus && onFocus(id, e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur && onBlur(id, e);
        }}
        style={{
          width: '100%',
          height: '6px',
          borderRadius: '3px',
          background: `linear-gradient(to right, #007bff 0%, #007bff ${((value || min) - min) / (max - min) * 100}%, #ddd ${((value || min) - min) / (max - min) * 100}%, #ddd 100%)`,
          outline: 'none',
          transition: 'background 0.2s ease',
          ...style["input"]
        }}
        {...props}
      />
      
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '12px', color: '#666'}}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
      
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}

// Dual Range Slider Component
export function DualRangeSliderInput({ 
  id, 
  label, 
  value = [0, 100], 
  onChange, 
  onFocus, 
  onBlur, 
  error, 
  style = {}, 
  hidden = false,
  min = 0,
  max = 100,
  step = 1,
  showValues = true,
  ...props 
}) {
  const [focused, setFocused] = useState(false);
  const [minVal, maxVal] = value;
  
  if (hidden) return null;
  
  const handleMinChange = (newMin) => {
    const min = Math.min(newMin, maxVal - step);
    onChange(id, [min, maxVal]);
  };
  
  const handleMaxChange = (newMax) => {
    const max = Math.max(newMax, minVal + step);
    onChange(id, [minVal, max]);
  };
  
  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
          <label style={{...styles.base.label, margin: 0, ...style["label"]}}>{label}</label>
          {showValues && (
            <span style={{fontSize: '14px', color: '#666', fontWeight: 'bold'}}>
              {minVal} - {maxVal}
            </span>
          )}
        </div>
      )}
      
      <div style={{position: 'relative', height: '24px'}}>
        <div style={{
          position: 'absolute',
          top: '9px',
          left: 0,
          right: 0,
          height: '6px',
          backgroundColor: '#ddd',
          borderRadius: '3px'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '9px',
          left: `${minPercent}%`,
          width: `${maxPercent - minPercent}%`,
          height: '6px',
          backgroundColor: '#007bff',
          borderRadius: '3px'
        }} />
        
        <input
          type="range"
          // @ts-ignore
          min={min}
          // @ts-ignore
          max={max}
          step={step}
          value={minVal}
          onChange={(e) => handleMinChange(Number(e.target["value"]))}
          onFocus={(e) => {
            setFocused(true);
            onFocus && onFocus(id, e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur && onBlur(id, e);
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '24px',
            background: 'transparent',
            pointerEvents: 'none',
            appearance: 'none',
            ...style["input"]
          }}
          {...props}
        />
        
        <input
          type="range"
          
          // @ts-ignore
          min={min}
          // @ts-ignore
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => handleMaxChange(Number(e.target["value"]))}
          onFocus={(e) => {
            setFocused(true);
            onFocus && onFocus(id, e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur && onBlur(id, e);
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '24px',
            background: 'transparent',
            pointerEvents: 'none',
            appearance: 'none',
            ...style["input"]
          }}
          {...props}
        />
      </div>
      
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '12px', color: '#666'}}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
      
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}

// Email Input Component
export function EmailInput({ 
  id, 
  label, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  error, 
  style = {}, 
  hidden = false,
  ...props 
}) {
  const [focused, setFocused] = useState(false);
  
  if (hidden) return null;
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && <label htmlFor={id} style={{...styles.base.label, ...style["label"]}}>{label}</label>}
      <input
        id={id}
        type="email"
        value={value || ''}
        onChange={(e) => onChange(id, e.target["value"], e)}
        onFocus={(e) => {
          setFocused(true);
          onFocus && onFocus(id, e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur && onBlur(id, e);
        }}
        style={{
          ...styles.base.input,
          ...(focused ? styles.base.focused : {}),
          ...(error ? styles.base.error : {}),
          ...style["input"]
        }}
        {...props}
      />
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}

// Date Input Component
export function DateInput({ 
  id, 
  label, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  error, 
  style = {}, 
  hidden = false,
  ...props 
}) {
  const [focused, setFocused] = useState(false);
  
  if (hidden) return null;
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && <label htmlFor={id} style={{...styles.base.label, ...style["label"]}}>{label}</label>}
      <input
        id={id}
        type="date"
        value={value || ''}
        onChange={(e) => onChange(id, e.target["value"], e)}
        onFocus={(e) => {
          setFocused(true);
          onFocus && onFocus(id, e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur && onBlur(id, e);
        }}
        style={{
          ...styles.base.input,
          ...(focused ? styles.base.focused : {}),
          ...(error ? styles.base.error : {}),
          ...style["input"]
        }}
        {...props}
      />
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}

// Date Time Input Component
export function DateTimeInput({ 
  id, 
  label, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  error, 
  style = {}, 
  hidden = false,
  ...props 
}) {
  const [focused, setFocused] = useState(false);
  
  if (hidden) return null;
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && <label htmlFor={id} style={{...styles.base.label, ...style["label"]}}>{label}</label>}
      <input
        id={id}
        type="datetime-local"
        value={value || ''}
        onChange={(e) => onChange(id, e.target["value"], e)}
        onFocus={(e) => {
          setFocused(true);
          onFocus && onFocus(id, e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur && onBlur(id, e);
        }}
        style={{
          ...styles.base.input,
          ...(focused ? styles.base.focused : {}),
          ...(error ? styles.base.error : {}),
          ...style["input"]
        }}
        {...props}
      />
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}

// Time Input Component
export function TimeInput({ 
  id, 
  label, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  error, 
  style = {}, 
  hidden = false,
  ...props 
}) {
  const [focused, setFocused] = useState(false);
  
  if (hidden) return null;
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && <label htmlFor={id} style={{...styles.base.label, ...style["label"]}}>{label}</label>}
      <input
        id={id}
        type="time"
        value={value || ''}
        onChange={(e) => onChange(id, e.target["value"], e)}
        onFocus={(e) => {
          setFocused(true);
          onFocus && onFocus(id, e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur && onBlur(id, e);
        }}
        style={{
          ...styles.base.input,
          ...(focused ? styles.base.focused : {}),
          ...(error ? styles.base.error : {}),
          ...style["input"]
        }}
        {...props}
      />
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}

// Month Input Component
export function MonthInput({ 
  id, 
  label, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  error, 
  style = {}, 
  hidden = false,
  ...props 
}) {
  const [focused, setFocused] = useState(false);
  
  if (hidden) return null;
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && <label htmlFor={id} style={{...styles.base.label, ...style["label"]}}>{label}</label>}
      <input
        id={id}
        type="month"
        value={value || ''}
        onChange={(e) => onChange(id, e.target["value"], e)}
        onFocus={(e) => {
          setFocused(true);
          onFocus && onFocus(id, e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur && onBlur(id, e);
        }}
        style={{
          ...styles.base.input,
          ...(focused ? styles.base.focused : {}),
          ...(error ? styles.base.error : {}),
          ...style["input"]
        }}
        {...props}
      />
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}

// Week Input Component
export function WeekInput({ 
  id, 
  label, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  error, 
  style = {}, 
  hidden = false,
  ...props 
}) {
  const [focused, setFocused] = useState(false);
  
  if (hidden) return null;
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && <label htmlFor={id} style={{...styles.base.label, ...style["label"]}}>{label}</label>}
      <input
        id={id}
        type="week"
        value={value || ''}
        onChange={(e) => onChange(id, e.target["value"], e)}
        onFocus={(e) => {
          setFocused(true);
          onFocus && onFocus(id, e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur && onBlur(id, e);
        }}
        style={{
          ...styles.base.input,
          ...(focused ? styles.base.focused : {}),
          ...(error ? styles.base.error : {}),
          ...style["input"]
        }}
        {...props}
      />
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}

// Multi Select Dropdown Component
export function MultiSelectInput({ 
  id, 
  label, 
  value = [], 
  options = [], 
  onChange, 
  onFocus, 
  onBlur, 
  error, 
  style = {}, 
  hidden = false,
  ...props 
}) {
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  if (hidden) return null;
  
  const handleToggleOption = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(id, newValue);
  };
  
  const selectedLabels = options
    .filter(option => value.includes(option.value))
    .map(option => option.label)
    .join(', ');
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && <label htmlFor={id} style={{...styles.base.label, ...style["label"]}}>{label}</label>}
      <div style={{position: 'relative'}}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          onFocus={(e) => {
            setFocused(true);
            onFocus && onFocus(id, e);
          }}
          onBlur={(e) => {
            setFocused(false);
            setIsOpen(false);
            onBlur && onBlur(id, e);
          }}
          style={{
            ...styles.base.input,
            ...(focused ? styles.base.focused : {}),
            ...(error ? styles.base.error : {}),
            cursor: 'pointer',
            minHeight: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...style["input"]
          }}
          tabIndex={0}
        >
          <span>{selectedLabels || props.placeholder || 'Select options...'}</span>
          <span>{isOpen ? '▲' : '▼'}</span>
        </div>
        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000
          }}>
            {options.map(option => (
              <div
                key={option.value}
                onClick={() => handleToggleOption(option.value)}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  backgroundColor: value.includes(option.value) ? '#e3f2fd' : 'white',
                  borderBottom: '1px solid #eee'
                }}
              >
                <input
                  type="checkbox"
                  checked={value.includes(option.value)}
                  onChange={() => {}}
                  style={{marginRight: '8px'}}
                />
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}

// Lookup Dropdown with Search Component
export function LookupInput({ 
  id, 
  label, 
  value, 
  options = [], 
  onChange, 
  onFocus, 
  onBlur, 
  onSearch,
  error, 
  style = {}, 
  hidden = false,
  searchable = true,
  ...props 
}) {
  const [focused, setFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  if (hidden) return null;
  
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectedOption = options.find(option => option.value === value);
  
  const handleSelect = (optionValue) => {
    onChange(id, optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && <label htmlFor={id} style={{...styles.base.label, ...style["label"]}}>{label}</label>}
      <div style={{position: 'relative'}}>
        <input
          type="text"
          value={isOpen ? searchTerm : (selectedOption?.label || '')}
          onChange={(e) => {
            setSearchTerm(e.target["value"]);
            onSearch && onSearch(e.target["value"]);
          }}
          onFocus={(e) => {
            setFocused(true);
            setIsOpen(true);
            onFocus && onFocus(id, e);
          }}
          onBlur={(e) => {
            setTimeout(() => {
              setFocused(false);
              setIsOpen(false);
            }, 200);
            onBlur && onBlur(id, e);
          }}
          placeholder={props.placeholder || 'Search or select...'}
          style={{
            ...styles.base.input,
            ...(focused ? styles.base.focused : {}),
            ...(error ? styles.base.error : {}),
            ...style["input"]
          }}
          {...props}
        />
        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000
          }}>
            {filteredOptions.length === 0 ? (
              <div style={{padding: '8px 12px', color: '#666'}}>No options found</div>
            ) : (
              filteredOptions.map(option => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    backgroundColor: option.value === value ? '#e3f2fd' : 'white',
                    borderBottom: '1px solid #eee'
                  }}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}

// Single File Upload Component
export function FileUploadInput({ 
  id, 
  label, 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  error, 
  style = {}, 
  hidden = false,
  accept,
  maxSize = 5 * 1024 * 1024, // 5MB default
  ...props 
}) {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  
  if (hidden) return null;
  
  const handleFileSelect = (file) => {
    if (file && file.size > maxSize) {
      onChange(id, null, null, `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`);
      return;
    }
    onChange(id, file);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && <label style={{...styles.base.label, ...style["label"]}}>{label}</label>}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        style={{
          ...styles.base.input,
          minHeight: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backgroundColor: dragOver ? '#f0f8ff' : '#fafafa',
          border: dragOver ? '2px dashed #007bff' : '2px dashed #ddd',
          ...(error ? styles.base.error : {}),
          ...style["input"]
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={(e) => handleFileSelect(e.target["files"]?.[0])}
          style={{display: 'none'}}
          {...props}
        />
        {value ? (
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '24px', marginBottom: '8px'}}>📄</div>
            <div style={{fontSize: '14px', fontWeight: 'bold'}}>{value.name}</div>
            <div style={{fontSize: '12px', color: '#666'}}>{(value.size / 1024).toFixed(1)} KB</div>
          </div>
        ) : (
          <div style={{textAlign: 'center', color: '#666'}}>
            <div style={{fontSize: '24px', marginBottom: '8px'}}>📁</div>
            <div>Click to select or drag & drop a file</div>
          </div>
        )}
      </div>
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}

// Image Upload Grid Component
export function ImageUploadGrid({ 
  id, 
  label, 
  value = [], 
  onChange, 
  error, 
  style = {}, 
  hidden = false,
  maxFiles = 6,
  maxSize = 5 * 1024 * 1024,
  ...props 
}) {
  const fileInputRef = useRef(null);
  
  if (hidden) return null;
  
  const handleFilesSelect = (files) => {
    const validFiles = [];
    const errors = [];
    
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name} is not an image`);
        return;
      }
      if (file.size > maxSize) {
        errors.push(`${file.name} exceeds size limit`);
        return;
      }
      validFiles.push(file);
    });
    
    const newFiles = [...value, ...validFiles].slice(0, maxFiles);
    onChange(id, newFiles, null, errors.length > 0 ? errors.join(', ') : null);
  };
  
  const removeFile = (index) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(id, newFiles);
  };
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && <label style={{...styles.base.label, ...style["label"]}}>{label}</label>}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '12px',
        ...style["input"]
      }}>
        {value.map((file, index) => (
          <div key={index} style={{
            position: 'relative',
            aspectRatio: '1',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #ddd'
          }}>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <button
              onClick={() => removeFile(index)}
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ×
            </button>
          </div>
        ))}
        
        {value.length < maxFiles && (
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              aspectRatio: '1',
              border: '2px dashed #ddd',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: '#fafafa'
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFilesSelect(e.target["files"])}
              style={{display: 'none'}}
              {...props}
            />
            <div style={{fontSize: '32px', color: '#ccc'}}>+</div>
            <div style={{fontSize: '12px', color: '#666', textAlign: 'center'}}>
              Add Image
            </div>
          </div>
        )}
      </div>
      
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}

// Image Select Grid Component
export function ImageSelectGrid({ 
  id, 
  label, 
  value, 
  images = [], 
  onChange, 
  error, 
  style = {}, 
  hidden = false,
  columns = 3,
  ...props 
}) {
  if (hidden) return null;
  
  return (
    <div style={{...styles.base.field, ...style["container"]}}>
      {label && <label style={{...styles.base.label, ...style["label"]}}>{label}</label>}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '12px',
        ...style["input"]
      }}>
        {images.map((image, index) => (
          <div
            key={image.id || index}
            onClick={() => onChange(id, image.id || image.value)}
            style={{
              position: 'relative',
              aspectRatio: '1',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: value === (image.id || image.value) ? '3px solid #007bff' : '1px solid #ddd',
              transition: 'border 0.2s ease'
            }}
          >
            <img
              src={image.src || image.url}
              alt={image.alt || image.label || `Image ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            {value === (image.id || image.value) && (
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}>
                ✓
              </div>
            )}
            {image.label && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '4px 8px',
                fontSize: '12px',
                textAlign: 'center'
              }}>
                {image.label}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {error && <div style={{...styles.base.errorText, ...style["error"]}}>{error}</div>}
    </div>
  );
}
