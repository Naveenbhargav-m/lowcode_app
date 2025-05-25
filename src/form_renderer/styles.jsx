
// Central styles repository
const styles = {
    // Base styles
    base: {
      field: {
        marginBottom: '16px',
        width: '100%',
      },
      label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '500',
        fontSize: '14px',
        color: '#333',
      },
      input: {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #ddd',
        fontSize: '14px',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      },
      select: {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #ddd',
        fontSize: '14px',
        backgroundColor: '#fff',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      },
      checkbox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      },
      checkboxInput: {
        width: '18px',
        height: '18px',
        cursor: 'pointer',
      },
      focused: {
        borderColor: '#4f46e5',
        boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
        outline: 'none',
      },
      error: {
        borderColor: '#ef4444',
        boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
      },
      errorText: {
        color: '#ef4444',
        fontSize: '12px',
        marginTop: '4px',
      },
      buttonGroup: {
        display: 'flex',
        gap: '12px',
        marginTop: '24px',
      },
      button: {
        padding: '10px 16px',
        borderRadius: '6px',
        border: 'none',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      },
      primaryButton: {
        backgroundColor: '#4f46e5',
        color: '#fff',
      },
      secondaryButton: {
        backgroundColor: '#f3f4f6',
        color: '#374151',
      },
    },
    // Layout styles
    layout: {
      form: {
        width: '100%',
        "color": "black",
        maxWidth: '800px',
        margin: '0 auto',
        padding: '24px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        display: "flex",
        "flexDirection": "column"
      },
      row: {
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        width: '100%',
        marginBottom: '16px',
      },
      column: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
      },
      panel: {
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        marginBottom: '16px',
      },
      steps: {
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        padding: '16px 0',
        borderBottom: '1px solid #eee',
      },
      step: {
        padding: '6px 12px',
        borderRadius: '16px',
        fontSize: '14px',
        fontWeight: '500',
      },
      activeStep: {
        backgroundColor: '#4f46e5',
        color: '#fff',
      },
      inactiveStep: {
        backgroundColor: '#e5e7eb',
        color: '#374151',
      },
      completedStep: {
        backgroundColor: '#10b981',
        color: '#fff',
      },
    }
  };

  export {styles};