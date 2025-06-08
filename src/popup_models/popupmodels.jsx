import React, { useState, useEffect, createContext, useContext } from 'react';

// Global state management (similar to signals)
class GlobalState {
  constructor() {
    this.listeners = new Set();
    this.state = {
      modal: { isOpen: false, children: null },
      sideDrawer: { isOpen: false, children: null },
      bottomDrawer: { isOpen: false, children: null }
    };
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.listeners.forEach(listener => listener(this.state));
  }

  getState() {
    return this.state;
  }
}

const globalState = new GlobalState();

// Global API functions that can be called from anywhere
export const showModal = (children) => {
  globalState.setState({
    modal: { isOpen: true, children }
  });
};

export const hideModal = () => {
  globalState.setState({
    modal: { isOpen: false, children: null }
  });
};

export const showSideDrawer = (children) => {
  globalState.setState({
    sideDrawer: { isOpen: true, children }
  });
};

export const hideSideDrawer = () => {
  globalState.setState({
    sideDrawer: { isOpen: false, children: null }
  });
};

export const showBottomDrawer = (children) => {
  globalState.setState({
    bottomDrawer: { isOpen: true, children }
  });
};

export const hideBottomDrawer = () => {
  globalState.setState({
    bottomDrawer: { isOpen: false, children: null }
  });
};

// Hook to use global state
const useGlobalState = () => {
  const [state, setState] = useState(globalState.getState());

  useEffect(() => {
    const unsubscribe = globalState.subscribe(setState);
    return unsubscribe;
  }, []);

  return state;
};

// Modal Component
const Modal = () => {
  const { modal } = useGlobalState();

  if (!modal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={hideModal}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
        <button
          onClick={hideModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
        <div className="p-6">
          {modal.children}
        </div>
      </div>
    </div>
  );
};

// Side Drawer Component
const SideDrawer = () => {
  const { sideDrawer } = useGlobalState();

  if (!sideDrawer.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={hideSideDrawer}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${
          sideDrawer.isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={hideSideDrawer}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-full">
          {sideDrawer.children}
        </div>
      </div>
    </div>
  );
};

// Bottom Drawer Component
const BottomDrawer = () => {
  const { bottomDrawer } = useGlobalState();

  if (!bottomDrawer.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={hideBottomDrawer}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-xl transform transition-transform duration-300 ${
          bottomDrawer.isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '80vh' }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto"></div>
          <button
            onClick={hideBottomDrawer}
            className="absolute right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 64px)' }}>
          {bottomDrawer.children}
        </div>
      </div>
    </div>
  );
};

// Demo component to show usage
const DemoContent = () => {
  // These functions can be called from anywhere in your app
  const openModal = () => {
    showModal(
      <div>
        <h3 className="text-lg font-bold mb-4">Modal Content</h3>
        <p className="mb-4">This is dynamic content passed to the modal!</p>
        <button 
          onClick={hideModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close Modal
        </button>
      </div>
    );
  };

  const openSideDrawer = () => {
    showSideDrawer(
      <div>
        <h3 className="text-lg font-bold mb-4">Side Menu</h3>
        <ul className="space-y-2">
          <li><a href="#" className="block p-2 hover:bg-gray-100 rounded">Home</a></li>
          <li><a href="#" className="block p-2 hover:bg-gray-100 rounded">About</a></li>
          <li><a href="#" className="block p-2 hover:bg-gray-100 rounded">Contact</a></li>
        </ul>
        <button 
          onClick={hideSideDrawer}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close Drawer
        </button>
      </div>
    );
  };

  const openBottomDrawer = () => {
    showBottomDrawer(
      <div>
        <h3 className="text-lg font-bold mb-4">Bottom Sheet</h3>
        <div className="space-y-4">
          <p>This is a bottom drawer with dynamic content!</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-gray-200 p-3 rounded">Option 1</button>
            <button className="bg-gray-200 p-3 rounded">Option 2</button>
            <button className="bg-gray-200 p-3 rounded">Option 3</button>
            <button className="bg-gray-200 p-3 rounded">Option 4</button>
          </div>
          <button 
            onClick={hideBottomDrawer}
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
          >
            Close Bottom Drawer
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Global Drawers & Modal System</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Demo Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={openModal}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Open Modal
            </button>
            <button 
              onClick={openSideDrawer}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Open Side Drawer
            </button>
            <button 
              onClick={openBottomDrawer}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Open Bottom Drawer
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Usage Example</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`// Call from anywhere in your app:
import { showModal, showSideDrawer, showBottomDrawer } from './components';

// Show modal with custom content
showModal(<div>Custom Modal Content</div>);

// Show side drawer
showSideDrawer(<div>Menu Items</div>);

// Show bottom drawer
showBottomDrawer(<div>Bottom Sheet Content</div>);`}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  return (
    <>
      <DemoContent />
      <Modal />
      <SideDrawer />
      <BottomDrawer />
    </>
  );
}


export {Modal, SideDrawer, BottomDrawer, DemoContent};