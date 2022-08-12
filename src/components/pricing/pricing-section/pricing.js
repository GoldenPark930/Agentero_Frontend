import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './_pricing.css';
import logo_mini from '../../../assets/images/logo-mini.svg';
import $ from "jquery";
import ThankYouModal from '../../common/modals/ThankYouModal';
import FormControl from '@material-ui/core/FormControl';
import {TextField} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

let error_messages = [];
let success_message = [];

class PricingForm extends Component {
    initialState = {
        firstName: '',
        lastName: '',
        workEmail: '',
        phoneNumber: '',
        companyName: '',
        agencySystem: 'Select',
        message: '',
        hasError: false,
        successSent: false,
        errorsField: [],
        loading: false
    };

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.myNewRef = React.createRef();
        this.inputRef = React.createRef();
    }

    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.trim());
    };

    validatePhone = (phone) => {
        let len = 0;
        for (let i = 0; i < phone.length; i++) {
            if (phone[i] === '_') {
                break;
            } else if (!isNaN(phone[i])) {
                len++
            }
        }
        return len > 5;
        /*const re = /^\d+$/;
        return re.test(phone);*/
    };

        // handle phone focus
        handlePhoneSelect = (e) => {
            var el = e.target;
            let index = 0;
                let str = this.state.phoneNumber;
                for (let i = this.state.phoneNumber.length - 1; i >= 0; i--) {
                    if (str[i] !== '_' && str[i] !== '-') {
                        index = i +1;
                        break;
                    }
                }
                if (index === 3 || index === 7) {
                    setTimeout(() => {
                        el.setSelectionRange(index+1,index+1);
                    }, 0);
                } else {
                    setTimeout(() => {
                        el.setSelectionRange(index,index);
                    }, 0);
                }
                
        }
        handlePhoneFocus = (e) => {
            var el = e.target;
            if (this.state.phoneNumber === '') {
                console.log('ffff');
                this.setState({
                    phoneNumber: '___-___-____'
                })
                setTimeout(() => {
                    el.setSelectionRange(0, 0);
                }, 0);
            }
             else {
                let index = 0;
                let str = this.state.phoneNumber;
                for (let i = this.state.phoneNumber.length - 1; i >= 0; i--) {
                    if (str[i] !== '_' && str[i] !== '-') {
                        index = i;
                        break;
                    }
                }
                setTimeout(() => {
                    el.setSelectionRange(index+1,index+1);
                }, 0);
             }
            
        }
        handlePhoneBlur = (e) => {
            
            if (this.state.phoneNumber === '___-___-____'){
                this.setState({
                    phoneNumber: ''
                })
            }
        }
        handleInputChange = (event) => {
            const target = event.target;
            const value = target.value;
            const name = target.name;
            if (this.state.successSent) {
                success_message = [];
                this.setState({successSent: false})
            }
            if (target.id === 'phone-input') {
                let pos = this.inputRef.current.selectionStart;
                if (value.length < 12) {
                    if (pos !== 7 && pos !== 3) {
                        console.log('re', pos)
                        let val = this.state.phoneNumber;
                        let val2 = val.substr(0, pos ) + '_' + val.substr(pos +1 );
                        this.setState({
                            phoneNumber: val2
                        }, () => {
                            setTimeout(() => {
                                target.setSelectionRange(pos  , pos );
                            }, 0);
                        })
                    } else {
                        let val = this.state.phoneNumber;
                        let val2 = val.substr(0, pos-1 ) + '_' + val.substr(pos );
                        this.setState({
                            phoneNumber: val2
                        }, () => {
                            setTimeout(() => {
                                target.setSelectionRange(pos-1  , pos-1 );
                            }, 0);
                        })
                    }
                    
                }
                else if(pos < 13 && !isNaN(value[this.inputRef.current.selectionStart - 1]) && pos !== 4 && pos !== 8) {
                    
                    let val = this.state.phoneNumber;
                    let val2 = val.substr(0, pos - 1) + value[pos - 1] + val.substr(pos, 13);
                    
                    this.setState({
                        phoneNumber: val2
                    }, () => {
                        setTimeout(() => {
                            target.setSelectionRange(pos  , pos );
                        }, 0);
                        if (pos === 3 || pos === 7) {
                            setTimeout(() => {
                                target.setSelectionRange(pos+1  , pos+1 );
                            }, 0);
                        } else {
                            setTimeout(() => {
                                target.setSelectionRange(pos   , pos );
                        }, 0);
                        }
                    });
                    
                }
                
            } else {
                this.setState({
                    [name]: value
                });
            }
            
        };
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    checkValidation = (ev) => {
        ev.preventDefault();
        error_messages = [];
        success_message = [];
        let errors = [];
        let hasError = false;

        const {firstName, workEmail, phoneNumber, companyName, agencySystem} = this.state;
        this.setState({hasError: hasError});
        this.setState({errorsField: errors});
        if (!firstName || firstName === '') {
            errors['firstName'] = 1
            error_messages.push(<p key='firstName'>
                <span className="font-bold">Full name: </span>
                Required field
            </p>);
            hasError = true;
        }

        if (workEmail) {
            if (!this.validateEmail(workEmail)) {
                errors['email'] = 1
                error_messages.push(<p key='email1'>
                    <span className="font-bold">Email: </span>
                    Must be a valid email:example@company.com
                </p>);
                hasError = true;
            }
        } else {
            errors['email'] = 1
            error_messages.push(<p key='email2'>
                <span className="font-bold">Email: </span>
                Required field
            </p>);
            hasError = true;
        }

        if (phoneNumber) {
            if (!this.validatePhone(phoneNumber)) {
                errors['phone'] = 1
                error_messages.push(<p key='phone1'>
                    <span className="font-bold">Phone number: </span>
                    Must be more than 5 characters:123456

                </p>);
                hasError = true;
            }
        } else {
            errors['phone'] = 1
            error_messages.push(<p key='phone2'>
                <span className="font-bold">Phone number: </span>
                Required field
            </p>);
            hasError = true;
        }

        if (!companyName) {
            errors['company'] = 1
            error_messages.push(<p key='company'>
                <span className="font-bold">Agency name: </span>
                Required field
            </p>);
            hasError = true;
        }

        if (agencySystem === 'Select') {
            errors['agency'] = 1

            error_messages.push(<p key='agency'>
                <span className="font-bold">Agency Management System: </span>
                Required field
            </p>);
            hasError = true;
        }
        this.setState({errorsField: errors});
        this.setState({hasError: hasError});

        return hasError;

    };

    sendData = async (e) => {
        this.setState({
            loading: true
        })
        let {firstName, lastName, workEmail, companyName, message, agencySystem} = this.state;
        let ph = '';
        for (let i = 0; i < this.state.phoneNumber.length; i++) {
            if (this.state.phoneNumber[i] === '_') {
                break;
            } else if (!isNaN(this.state.phoneNumber[i])) {
                ph = ph + this.state.phoneNumber[i];
            }
        }
        const phoneNumber = ph;
        lastName=firstName;
        e.preventDefault();
        let hasError = await this.checkValidation(e);
        if (hasError) {
            this.setState({
                loading: false
            })
            return false
        }

            const request = new Request('https://us-central1-agentero-website.cloudfunctions.net/app/request-pricing', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({firstName, lastName, workEmail, phoneNumber, companyName, message, agencySystem}),
        });

        fetch(request)
            .then(data => {
                if (data.status < 400) {

                    this.setState(this.initialState);
                    this.setState({errorsField: []})
                    $('#thankYouModal').modal('show');

                } else {
                    console.log('Error send-contact', data);
                    alert("Error while sending message");
                }
                this.setState({
                    loading: false
                })
            })
            .catch(reason => {
                this.setState({
                    loading: false
                })
                console.log('Error contact reason:', reason);
                alert("Error while accessing Agentero server");
            });
    };

    setAgencySyste = (agState) => {
        this.setState({agencySystem: agState})
    };

    render() {
        let textFiledClasses = 'form-control fs16 c-gray w-100';

        return (
            <section className="price-section roboto-font">
                <Link id="btnPriceBack" to='/' className="btn close-button">
                    <ArrowBackIosIcon/>
                    <span> Back to Agentero</span>
                </Link>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="price-content position-relative">
                                <div className="price-header">
                                    <Link id='btnPriceLogo' to="/">
                                        <img src={logo_mini} alt="agentero" className="price-header__logo"/>
                                    </Link>
                                    <h5 className="price-title c-gray fs28 font-light">Request Pricing</h5>
                                </div>

                                <div className="price-body">

                                    <p className="price-info c-gray fs15 text-center">Pricing depends on a few factors
                                        that are unique to every agency. Tell us what you need and we’ll build a plan
                                        specifically
                                        for you and your team.</p>
                                    <form onSubmit={this.sendData} className="new-form-price">
                                        <div
                                            className={(this.state.hasError ? "error-message" : '') + " fs16 c-white"}>
                                            {error_messages[0]}</div>

                                        <div className="form-group">
                                            <FormControl className='w-100 form-control-style'>
                                                <TextField
                                                    style={{border: 'none'}}
                                                    label="Full name"
                                                    placeholder="Full Name"
                                                    className={(this.state.errorsField['firstName'] ? "error-filed " + textFiledClasses : textFiledClasses)}
                                                    margin="normal"
                                                    variant="outlined"
                                                    name="firstName"
                                                    onChange={this.handleInputChange}
                                                    value={this.state.firstName}
                                                />
                                            </FormControl>
                                        </div>
                                        <div className="form-group">

                                            <FormControl className='w-100 form-control-style'>
                                                <TextField
                                                    style={{border: 'none'}}
                                                    label="Email"
                                                    placeholder="Email"
                                                    type="email"
                                                    className={(this.state.errorsField['email'] ? "error-filed " + textFiledClasses : textFiledClasses)}
                                                    margin="normal"
                                                    variant="outlined"
                                                    name="workEmail"
                                                    onChange={this.handleInputChange}
                                                    value={this.state.workEmail}
                                                />
                                            </FormControl>
                                        </div>
                                        <div className="form-group">
                                            <FormControl className='w-100 form-control-style'>
                                                <TextField
                                                    style={{border: 'none'}}
                                                    label="Phone number"
                                                    placeholder="Phone number"
                                                    className={(this.state.errorsField['phone'] ? "error-filed " + textFiledClasses : textFiledClasses)}
                                                    margin="normal"
                                                    variant="outlined"
                                                    name="phoneNumber"
                                                    inputRef={this.inputRef}
                                                    onSelect={this.handlePhoneSelect}
                                                    onFocus={this.handlePhoneFocus}
                                                    onBlur={this.handlePhoneBlur}
                                                    onChange={this.handleInputChange}
                                                    value={this.state.phoneNumber}
                                                    id="phone-input"
                                                />
                                            </FormControl>
                                        </div>
                                        <div className="form-group">
                                            <FormControl className='w-100 form-control-style'>
                                                <TextField
                                                    style={{border: 'none'}}
                                                    label="Agency name"
                                                    placeholder="Agency name"
                                                    className={(this.state.errorsField['company'] ? "error-filed " + textFiledClasses : textFiledClasses)}
                                                    margin="normal"
                                                    variant="outlined"
                                                    name="companyName"
                                                    onChange={this.handleInputChange}
                                                    value={this.state.companyName}
                                                />
                                            </FormControl>
                                        </div>
                                        <div className="form-group ">
                                            <div className="dropup ">
                                                <button type="button"
                                                        className={(this.state.errorsField['agency'] ? "error-filed dropup-btn dropdown-toggle" : 'dropup-btn dropdown-toggle')}
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false">
                                                    <span
                                                        className={(this.state.errorsField['agency'] ? "info db fs11" : 'info db fs11 default-color')}>Which Agency Management System are you using?</span>
                                                    <span
                                                        className={(this.state.agencySystem === 'Select' && !this.state.errorsField['agency']) ? 'default-color c-gray fs16 ' : 'fs16 c-gray'}>{this.state.agencySystem}</span>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <p className="fs14  dropup-txt ">Select</p>
                                                    <p className="fs14 c-gray dropup-txt" onClick={() => {
                                                        this.setAgencySyste('Ezlynx')
                                                    }}>Ezlynx</p>
                                                    <p className="fs14 c-gray dropup-txt" onClick={() => {
                                                        this.setAgencySyste('AMS 360')
                                                    }}>AMS 360</p>
                                                    <p className="fs14 c-gray dropup-txt" onClick={() => {
                                                        this.setAgencySyste('QQ Catalyst')
                                                    }}>QQ Catalyst</p>
                                                    <p className="fs14 c-gray dropup-txt" onClick={() => {
                                                        this.setAgencySyste('Applied')
                                                    }}>Applied</p>
                                                    <p className="fs14 c-gray dropup-txt" onClick={() => {
                                                        this.setAgencySyste('Hawksoft')
                                                    }}>Hawksoft</p>
                                                    <p className="fs14 c-gray dropup-txt" onClick={() => {
                                                        this.setAgencySyste('Agency Matrix')
                                                    }}>Agency Matrix</p>
                                                    <p className="fs14 c-gray dropup-txt" onClick={() => {
                                                this.setAgencySyste('NowCerts')
                                            }}>NowCerts</p>
                                                    <p className="fs14 c-gray dropup-txt" onClick={() => {
                                                        this.setAgencySyste('Other')
                                                    }}>Other</p>
                                                    <p className="fs14 c-gray dropup-txt" onClick={() => {
                                                        this.setAgencySyste('Not using any AMS')
                                                    }}>Not using any AMS</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <textarea rows="5" className="form-control " name='message'
                                                      value={this.state.message} onChange={this.handleInputChange}
                                                      placeholder="Message">{this.state.message}</textarea>
                                        </div>
                                        <div className="form-group text-center">
                                            <button id="btnPriceSubmit" className="btn btn__demo submit-btn fs16 bgc-green c-white" type="submit" disabled={this.state.loading}>{this.state.loading ? <div class="spinner-border text-light" role="status"></div> : 'Request pricing'}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <ThankYouModal title='pricing' newRef={this.myNewRef} />
            </section>
        );
    }
};

export default PricingForm;