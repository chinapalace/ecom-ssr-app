'use client';
import { useEffect } from 'react';

interface PostMessageData {
  type: string;
  payload: Record<string, string>;
}

const PostMessageListener: React.FC = () => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const eventData: PostMessageData = event.data;
      console.log('eventData', eventData);
      // Check if the message is from your host app and has a specific type
      if (eventData.type === 'update-css-variables') {
        // Handle the message to update CSS variables
        const payload = eventData.payload;
        const root = document.documentElement;

        // Loop through the CSS variables object and set them as CSS variables on the root element
        for (const [key, value] of Object.entries(payload)) {
          root.style.setProperty(key, value);
        }
      }
    };

    // Add event listener for postMessage
    window.addEventListener('message', handleMessage);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return null; // Since this component is only for listening to postMessages, it doesn't render anything
};

export default PostMessageListener;
