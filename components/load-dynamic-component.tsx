import { Suspense, lazy } from 'react';

// Fallback component
const DefaultComponent = lazy(() => import('./DefaultComponent.tsx'));

// Function to dynamically import a component based on ID
const loadComponent = () => {
  try {
    return lazy(() =>
      import(
        /* webpackIgnore: true */ `https://unpkg.com/tapcart-consumer-components@latest/dist/tapcart-consumer-components.es.js`
      ).then((module) => ({ default: module.OrFooter }))
    );
  } catch (error) {
    console.error(`Failed to load the component with ID ${'test'}:`, error);
    return DefaultComponent;
  }
};

// Component wrapper for handling dynamic loading
export const DynamicComponentWrapper = ({ ...props }) => {
  const Component = loadComponent();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};
