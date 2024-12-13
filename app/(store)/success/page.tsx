"use client"

import useCartStore from '@/store/store';
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

function SuccessPage() {

    const searchParams = useSearchParams();
    const orderNumber = searchParams.get("orderNumber");
    const clearCart = useCartStore((state) => state.clearCart);
    const sessionId = searchParams.get("session_id")

    useEffect (() => {
        if(orderNumber) {
            clearCart();
        }
    }, [orderNumber, clearCart]);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
        <div className='bg-white p-12 rounded-xl max-w-2xl w-full mx-4'>
            <div className='flex justify-center mb-8'>
                <div className='h-16 w-16 bg-green-100 rounded-full flex items-center justify-center'>
                    <svg
                        className='h-8 w-8 text-green-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path 
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 13l4 4L19 7'
                        />
                    </svg>
                    
                </div>

            </div>

            <h1 className='text-4xl font-bold mb-6 text-center'>
                Thank You For Your Order
            </h1>

            <div className='border-t border-b border-gray-200 py-6 mb-6'>
                <p className='text-lg text-gray-200 mb-4'>
                    Your order has been confirmed and will be shipped shortly.
                </p>

                <div className='space-y-2'>
                    {orderNumber && (
                        <p className='text-gray-600 flex items-center space-x-5'>
                            <span>Order Number:</span>
                            <span className='font-mono text-sm text-green-600'>
                                {orderNumber}
                            </span>
                        </p>
                    )}

                    { sessionId && (
                        <p className='text-gray-600 flex justify-between'>
                            <span>Transaction ID</span>
                            <span className='font-mono text-sm'>{sessionId}</span>
                        </p>
                    )}
                </div>
            </div>

        </div>
      
    </div>
  )
}

export default SuccessPage
