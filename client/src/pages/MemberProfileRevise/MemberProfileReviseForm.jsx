import './style.scss';
import Swal from 'sweetalert2';
import { useState, useContext, useCallback, useEffect } from 'react';
import InputIME from './components/InputIME';
import _ from 'lodash';

import { MEMBER_PROFILE_REVISE } from '../../config/ajax-path';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginForm from '../Login/LoginForm';

function MemberProfileReviseForm() {
    const [memberProfileData, setMemberProfileData] = useState({
        account: '',
        name: '',
        birthdate: '',
        deathdate: '',
        email: '',
    });

    console.log(memberProfileData);

    // const [namePrevious, setNamePrevious] = useState('');
    // const [birthdatePrevious, setBirthdatePrevious] = useState('');
    // const [deathdatePrevious, setDeathdatePrevious] = useState('');
    // const [emailPrevious, setEmailPrevious] = useState('');

    const themeContext = useContext(ThemeContext);
    const { authorized, setAuth, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFieldsChange = (e) => {
        const id = e.target.id;
        const val = e.target.value;
        // console.log({ id, val });
        setMemberProfileData((prevState) => ({
            ...prevState,
            [id]: val,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(memberProfileData);

        fetch(MEMBER_PROFILE_REVISE, {
            method: 'POST',
            body: JSON.stringify(memberProfileData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((r) => r.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    localStorage.setItem('auth', JSON.stringify(result.data));
                    setAuth({
                        ...result.data,
                        authorized: true,
                    });
                    Swal.fire(result.error);
                    navigate('/memberprofile');
                } else {
                    Swal.fire(result.error);
                }
            });
    };

    // useEffect(() => {
    //     // console.log({
    //     //     account: accountPrevious,
    //     //     email: emailPrevious,
    //     //     password: passwordPrevious,
    //     //     confirmPassword: confirmPasswordPrevious,
    //     // });
    //     setMemberProfileData({
    //         name: namePrevious,
    //         birthdate: birthdatePrevious,
    //         deathdate: deathdatePrevious,
    //         email: emailPrevious,
    //     });
    // }, [namePrevious, birthdatePrevious, deathdatePrevious, emailPrevious]);

    return (
        <>
            {authorized ? (
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <section className="pb-4">
                                    <div className="bg-white bg-opacity-75 rounded-5">
                                        <section className="w-100 p-4 d-flex justify-content-center pb-4">
                                            {/* php */}
                                            <div className="card-2 d-flex">
                                                <div className="cards">
                                                    <br />
                                                    <ol
                                                        className="breadcrumb justify-content-center"
                                                        style={{
                                                            '--bs-breadcrumb-divider':
                                                                'none',
                                                        }}
                                                    >
                                                        <li
                                                            className="breadcrumb-item active"
                                                            aria-current="page"
                                                        >
                                                            <Link
                                                                to="/memberprofile"
                                                                className="breadcrumb-item breadcrumb-item-link"
                                                            >
                                                                會員中心主頁
                                                            </Link>
                                                        </li>

                                                        <li className="breadcrumb-item">
                                                            <Link
                                                                to="/memberprofilerevise"
                                                                className="breadcrumb-item-link"
                                                            >
                                                                修改會員資料
                                                            </Link>
                                                        </li>
                                                        <li className="breadcrumb-item">
                                                            <Link
                                                                to="/memberpasswordrevise"
                                                                className="breadcrumb-item-link"
                                                            >
                                                                修改登入密碼
                                                            </Link>
                                                        </li>
                                                        <li className="breadcrumb-item">
                                                            <Link
                                                                to="/membereventorder"
                                                                className="breadcrumb-item-link"
                                                            >
                                                                法喜充滿訂單
                                                            </Link>
                                                        </li>
                                                    </ol>
                                                    <section className="pb-4">
                                                        <div className="bg-white bg-opacity-75 rounded-5">
                                                            <section className="w-100 p-4 d-flex justify-content-center pb-4">
                                                                <div>
                                                                    <div className="tab-content">
                                                                        <form
                                                                            name="form1"
                                                                            onSubmit={
                                                                                handleUpdate
                                                                            }
                                                                        >
                                                                            <div className="mb-3 d-flex justify-content-center page-title">
                                                                                修改會員資料
                                                                            </div>
                                                                            <br />
                                                                            <div className="mb-3 page-field">
                                                                                <label
                                                                                    htmlFor="account"
                                                                                    className="form-label"
                                                                                >
                                                                                    帳戶名稱
                                                                                </label>
                                                                                <InputIME
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="account"
                                                                                    name="account"
                                                                                    placeholder="例：HappyGhost"
                                                                                    value={
                                                                                        memberProfileData.account
                                                                                    }
                                                                                    onChange={
                                                                                        handleFieldsChange
                                                                                    }
                                                                                    disabled="disabled"
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3 page-field">
                                                                                <label
                                                                                    htmlFor="name"
                                                                                    className="form-label"
                                                                                >
                                                                                    會員名稱
                                                                                </label>
                                                                                <InputIME
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="name"
                                                                                    name="name"
                                                                                    placeholder="快樂的靈魂"
                                                                                    value={
                                                                                        memberProfileData.name
                                                                                    }
                                                                                    onChange={
                                                                                        handleFieldsChange
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3 page-field">
                                                                                <label
                                                                                    htmlFor="birthdate"
                                                                                    className="form-label"
                                                                                >
                                                                                    出生日
                                                                                </label>
                                                                                <InputIME
                                                                                    type="date"
                                                                                    className="form-control"
                                                                                    id="birthdate"
                                                                                    name="birthdate"
                                                                                    value={
                                                                                        memberProfileData.birthdate
                                                                                    }
                                                                                    onChange={
                                                                                        handleFieldsChange
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3 page-field">
                                                                                <label
                                                                                    htmlFor="deathdate"
                                                                                    className="form-label"
                                                                                >
                                                                                    死亡日
                                                                                </label>
                                                                                <InputIME
                                                                                    type="date"
                                                                                    className="form-control"
                                                                                    id="deathdate"
                                                                                    name="deathdate"
                                                                                    value={
                                                                                        memberProfileData.deathdate
                                                                                    }
                                                                                    onChange={
                                                                                        handleFieldsChange
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3 page-field">
                                                                                <label
                                                                                    htmlFor="email"
                                                                                    className="form-label"
                                                                                >
                                                                                    電子信箱
                                                                                </label>
                                                                                <InputIME
                                                                                    type="email"
                                                                                    className="form-control"
                                                                                    id="email"
                                                                                    name="email"
                                                                                    placeholder="請輸入一個有效的電子信箱"
                                                                                    value={
                                                                                        memberProfileData.email
                                                                                    }
                                                                                    onChange={
                                                                                        handleFieldsChange
                                                                                    }
                                                                                    required
                                                                                />
                                                                            </div>

                                                                            <div className="d-flex justify-content-sm-evenly ">
                                                                                <button
                                                                                    type="submit"
                                                                                    className="btn-member btn-member-l btn-member-pri btn-member-outline-light"
                                                                                >
                                                                                    確認修改
                                                                                </button>
                                                                                {/* <button
                                                                                    type="reset"
                                                                                    className="btn-member btn-member-sec btn-member-l btn-member-outline-light"
                                                                                >
                                                                                    清除
                                                                                </button> */}
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <LoginForm />
                </>
            )}
        </>
    );
}

export default MemberProfileReviseForm;
