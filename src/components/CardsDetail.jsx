import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table"
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from "react-router-dom"
import { ADD } from "../redux/actions/action"
import { DLT } from "../redux/actions/action"
import { REMOVE } from "../redux/actions/action"
export const CardsDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const getdata = useSelector((state) => state.cartReducer.carts)
    // console.log(data)
    const compare = () => {
        let comparedata = getdata.filter((e) => {
            return e.id == id
        })
        setData(comparedata)
    }
    const history = useNavigate()



    const send = (e) => {
        dispatch(ADD(e))
    }



    const dlt = (id) => {
        dispatch(DLT(id))
        history("/")
    }

    const remove = (iteam) => {
        dispatch(REMOVE(iteam))
    }



    useEffect(() => {
        compare()
    }, [id])



    return (
        <>
            <div className='container mt-2'>
                <h2 className='text-center'>Iteams Details Page</h2>
            </div>

            <section className='container mt-3'>
                <div className='iteamsdetails'>
                    {data.map((elem) => {
                        return (
                            <>
                                <div className="items_img">
                                    <img src={elem.imgdata} alt="" />
                                </div>
                                <div className="details">
                                    <Table>
                                        <tr>
                                            <td>
                                                <p> <strong>Restaurant</strong> : {elem.rname}</p>
                                                <p> <strong>Price</strong> : ₹  {elem.price}</p>
                                                <p> <strong>Dishes</strong> :  {elem.address}</p>
                                                <p> <strong>Total</strong> : ₹ {elem.price * elem.qnty}</p>
                                                <div className='mt-5 d-flex justify-content-between aligin-items-center' style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>
                                                    <span onClick={elem.qnty <= 1 ? () => dlt(elem.id) : () => remove(elem)} style={{ fontSize: "24" }}>-</span>
                                                    <span style={{ fontSize: "22" }}>{elem.qnty}</span>
                                                    <span onClick={() => send(elem)} style={{ fontSize: "24" }}>+</span>
                                                </div>
                                            </td>
                                            <td>
                                                <p> <strong>Rating :</strong><span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{elem.rating} ★</span></p>
                                                <p> <strong>Order Review :</strong><span>{elem.somedata}</span></p>
                                                <p> <strong>Remove :</strong><span><i className='fas fa-trash' onClick={() => dlt(elem.id)} style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i></span></p>
                                            </td>
                                        </tr>
                                    </Table>
                                </div>
                            </>
                        )
                    })}

                </div>
            </section>
        </>
    )
}
