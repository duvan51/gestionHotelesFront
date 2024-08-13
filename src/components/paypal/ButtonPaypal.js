import React, { useEffect, useState, useRef } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'

const ButtonPaypal = ({data}) => {

    const [totalValue, setValues] = useState('1')
    const [actions, setActions] =useState({})
    const totalValueRef = useRef(totalValue);

    //const {invoice, totalValue} = data
    const invoice = "cafe"
    //const totalValue = "25000"

    useEffect(() => {
        if (data) {
            const newValue = data.toString();
            setValues(newValue)
            totalValueRef.current = newValue
        }
      }, [data]);

      console.log(actions)

  
  return (
    <div className='row justify-content-md-center'>
        <PayPalButtons
            createOrder ={(data, actions)=>{
                setActions(actions)
                console.log('data=> ',data)
                return actions.order.create({
                    purchase_units: [
                        {
                            description : invoice,
                            amount: {
                                value: totalValueRef.current,
                                
                            }
                        }
                    ]
                })

            }}
            onApprove={ async(data, actions)=>{
                const order = await actions.order?.capture()
                console.log("order=> ", order)
            }}
        />
    </div>
  )
}

export default ButtonPaypal


