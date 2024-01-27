'use client';

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function ClientEventPage({ productId }: { productId: string }) {
  const [error, setError] = useState(null);
  const eventData = {
    type: 'tapcart-sdk',
    message: JSON.stringify({
      id: uuidv4(),
      type: 'action',
      name: 'product/open',
      data: {
        productId: '8109689274680'
      }
    })
  };
  useEffect(() => {
    const messageHandlerName = 'Tapcart';

    try {
      if (window.webkit) {
        window.webkit.messageHandlers[messageHandlerName].postMessage(JSON.stringify(eventData));
        return;
      } else {
        window.postMessage(JSON.stringify(eventData));
      }
    } catch (error) {
      setError(error.message);
    }
  }, []);

  return <div>{error}</div>;
}

export default ClientEventPage;
