import React from 'react'
import closeBtn from '../assets/Icons/close-24px.svg'
import {Link} from 'react-router-dom';

function DeleteWarehouse(props) {
    const urlId = props.url.params.id;
    const warehouses = props.warehouses;
    const foundWarehouse = warehouses.find(warehouse => urlId === warehouse.id);
    const handleDelete = () => {
        props.deleteHandler(props.url.params.id);
    }

    return (
        <div className='delete__page--mobile-only'>
            {foundWarehouse && <div className='delete__card'>
                <div className='delete__card-within'>
                <Link to={`/warehouses`}  onClick={props.popUpHandler}>
                        <img src={closeBtn} className='delete__exit--btn' alt="delete"/>
                </Link>
                    <div className='delete__confirmation'>
                        <h1 className='delete__header'>{`Delete ${foundWarehouse.name} warehouse?`}</h1>
                        <p className='delete__details'>Please confirm that you'd like to delete the {foundWarehouse.name} from the list of warehouses.
                            You won't be able to undo this action.
                        </p>
                    </div>
                    <div className='delete__btns'>
                        <Link to={`/warehouses`}><button className='delete__cancel--btn' onClick={props.popUpHandler}>Cancel</button></Link>
                        <Link to={`/warehouses`}><button className='delete__delete--btn' onClick={handleDelete}>Delete</button></Link>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default DeleteWarehouse
