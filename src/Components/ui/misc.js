import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = (props) => {
    const template = <div
        style={{
            background: props.bck,
            fontSize: props.size,
            color: props.color,
            padding: '5px 10px',
            display: 'inline-block',
            fontFamily: 'Righteous',
            ...props.add
        }}
    >
        {props.children}
    </div>

    if(props.link === true){
        return (
            <Link to={props.linkto}>
                {template}
            </Link>
        )
    } else {
        return template
    }
}

export const firebaseLooper = (snapshot) => { // Chuyển tên object thành ID của object => chuyển thành mảng
    let data = [];
    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });
    return data
}

export const reverseArray = (actualArray) => { // Chuyển vị trí của mảng từ mới đến cũ
    let reversedArray = [];
    for(let i= actualArray.length-1;i>=0;i--){
        reversedArray.push(actualArray[i])
    }
    return reversedArray;
}

export const validate = (element) => { // sẽ trả về valid ok/not và thông báo
    let result = [true,''];

    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Must be a valid email':''}`;
        result = !valid ? [valid,message]: result;
    }

    if(element.validation.required){
        const valid = element.value.trim() !== ''; //có chuỗi : true, rỗng : false
        const message = `${!valid ? 'This field is required':''}`;
        result = !valid ? [valid,message]: result;
    }
    return result;
}
