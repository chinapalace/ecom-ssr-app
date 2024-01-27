'use client';

import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function ClientEventPage({ productId }: { productId: string }) {
  const eventData = {
    type: 'tapcart-sdk',
    message: JSON.stringify({
      id: uuidv4(),
      type: 'action',
      name: 'product/open',
      data: {
        productId
      }
    })
  };
  useEffect(() => {
    const messageHandlerName = 'Tapcart';

    window.postMessage(JSON.stringify(eventData));
  }, []);

  // This component doesn't render anything
  return null;
}

export default ClientEventPage;
