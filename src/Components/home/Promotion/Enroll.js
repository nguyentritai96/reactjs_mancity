import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import { validate } from '../../ui/misc'; 
import { firebasePromotions } from '../../../firebase';

import FormField from '../../ui/formFields';

class Enroll extends Component {

    state = {
        formError:false,
        formSuccess:'', 
        formdata:{
            email:{ 
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation:{ 
                    required: true,
                    email: true 
                },
                valid: false, 
                validationMessage:''
            }
        }

    }

    updateForm(element) {
        const newFormdata = {...this.state.formdata} // copy lại dữ liệu từ state
        const newElement = { ...newFormdata[element.id]} // chép lại elemet : email hoặc password,...
        newElement.value = element.event.target.value; // cập nhật lại giá trị mới
        let validData = validate(newElement); // chạy hàm validate cho giá trị mới đã được cập nhật
        newElement.valid = validData[0]; // giá trị trả về 1, là true hoặc false
        newElement.validationMessage = validData[1] // giá trị trả về 2, nội dung valid
        newFormdata[element.id] = newElement; // gán lại state.formdata.email
        this.setState({
            formError: false, // xóa lỗi submit không đc, mỗi khi update
            formdata: newFormdata // cập nhật vào state, phải cập nhận tận góc key
        })
    } 

    submitForm(event){
        event.preventDefault();
        
        let dataToSubmit = {};
        let formIsValid = true; // sử dụng biến mồi để kiểm tra valid toàn bộ formsubmit

        // eslint-disable-next-line no-unused-vars
        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid; // chỉ cần một false, formIsValid sẽ false
        }

        if(formIsValid){
            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once("value")
            .then((snapshot)=>{
                if(snapshot.val() === null){ // Nếu dữ liệu gửi về là null, tức là có thể lưu thì lưu dữ liệu
                    firebasePromotions.push(dataToSubmit); // lưu dữ liệu
                    this.resetFormSuccess(true); // Lưu thành công
                }else{ // ngược lại có thể lấy email trả về, tức là đã có lưu trữ trên database
                    this.resetFormSuccess(false); // Dữ liệu này đã có
                }
            })
        } else {
            this.setState({
                formError: true // => báo lỗi submit không được
            })
        }
    }

    resetFormSuccess(type){
        const newFormdata = {...this.state.formdata}

        // eslint-disable-next-line no-unused-vars
        for(let key in newFormdata){
            newFormdata[key].value = '';
            newFormdata[key].valid = false;
            newFormdata[key].validationMessage = '';
        }

        this.setState({
            formError:false,
            formdata: newFormdata,
            formSuccess: type ? 'Congratulations' : 'Already on the database'
        });
        this.successMessage();
    }

    successMessage(){
        setTimeout(()=>{
            this.setState({
                formSuccess:''
            })
        },2000)
    }

    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={ (event)=> this.submitForm(event)}>
                        <div className="enroll_title">
                            Enter your email
                        </div>

                        <div className="enroll_input">
                            <FormField 
                                id={'email'} 
                                formdata={this.state.formdata.email}
                                change={(element)=> this.updateForm(element)}
                            />

                            { this.state.formError ? 
                                <div className="error_label">Something is wrong, try again.</div>
                                :null
                            }

                            <div className="success_label">{this.state.formSuccess}</div>

                            <button onClick={(event)=> this.submitForm(event)}>Enroll</button>
                            <div className="enroll_discl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </div>
                        </div>
                        
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;