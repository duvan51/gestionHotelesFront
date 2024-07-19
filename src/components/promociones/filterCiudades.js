import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';

import { useQuery } from '@apollo/client';
import { GET_ALOJAMIENTOS } from '../../services/queries';

export default function BasicDemo({ciudad}) {

    const URLIMAGE = `http://localhost:8080/uploads`;

    const [ciudades, setCiudades] = useState([]);

    const { loading, error, data } = useQuery( GET_ALOJAMIENTOS );
    
    
    
    

    useEffect(() => {
        if(data && data.getAlojamientos){
            const products = data.getAlojamientos;
            const ciudadFilter = products.filter(x => x.ciudad === ciudad);
            setCiudades(ciudadFilter)
        }
      }, [data]); // e<- add empty brackets here
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
    
      

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const getSeverity = (ciudades) => {
        switch (ciudades.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

   
    const productTemplate = (product) => {
     
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3 cardImage">
                    <img src={`${URLIMAGE}${product.imagePrincipal}`} alt={product.name} className="w-6 shadow-2" />
                </div>
                <div>
                    <h4 className="mb-1">{product.title}</h4>
                    <h6 className="mt-0 mb-3">${product.numberPhone}</h6>
                    <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" rounded />
                        <Button icon="pi pi-star-fill" rounded severity="success" />
                    </div>
                </div>
                <div>
                    <div>
                        {product.ciudad}
                    </div>
                </div>
            </div>
        );
       
    };

    return (
        <div className="card">
            <Carousel value={ciudades} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        </div>
    )
}
        