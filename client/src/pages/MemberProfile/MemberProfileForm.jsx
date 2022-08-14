import './style.scss';
import { useState, useContext } from 'react';
import axios from 'axios';

import { MEMBER_PROFILE } from '../../config/ajax-path';
import Login from '../Login';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function MemberProfileForm() {
    const [loginData, setLoginData] = useState({
        account: '',
        password: '',
    });

    const { theme, themeContext } = useContext(ThemeContext);
    const { authorized, setAuth, userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFieldsChange = (e) => {
        const id = e.target.id;
        const val = e.target.value;
        // console.log({ id, val });
        setLoginData((prevState) => ({
            ...prevState,
            [id]: val,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(loginData);

        // TODO: 欄位檢查

        // 請注意 axios 和 fetch 的不同之處
        // fetch 要多轉換一次 .then(r => r.json())
        // fetch 的內容放在 body: fd
        // axios 會自動轉換 JSON 但結果放在 r.data 中
        // axios 的內容要放在 data: fd
        const result = await axios(MEMBER_PROFILE, {
            method: 'POST',
            data: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'Application/json',
            },
        });

        // console.log(result.data);

        if (result.data.success) {
            // localStorage.setItem('auth', JSON.stringify(result.data.data));
            // setAuth({ ...result.data.data, authorized: true });
            // navigate('/');
        } else {
            alert('帳密錯誤～～');
        }
    };

    return (
        <>
            {authorized ? (
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <section
                                    className="pb-4 justify-content-center memberBgCard rounded-5"
                                    style={{
                                        backgroundColor: theme.memberBgCard,
                                    }}
                                >
                                    <section className="w-100 p-4 d-flex justify-content-center pb-4 ">
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
                                                    <section
                                                        className="w-100 p-4 d-flex justify-content-center pb-4 rounded-5  memberBgCard"
                                                        style={{
                                                            backgroundColor:
                                                                theme.memberBgCard,
                                                        }}
                                                    >
                                                        <div className="tab-content">
                                                            <div className="mb-3 d-flex justify-content-center member-page-title">
                                                                會員中心主頁
                                                            </div>
                                                            <br />
                                                            <div className="card rounded-4">
                                                                <div className="card-body d-flex align-items-center">
                                                                    <div className="col-md-9 mb-md-0 p-md-4 member-page-field">
                                                                        {/* TODO：串後端資料 */}
                                                                        <h5 className="card-title">
                                                                            歡迎回來，
                                                                            <p className="card-text ">
                                                                                <br />
                                                                                您目前的陰德值為：
                                                                            </p>
                                                                        </h5>
                                                                    </div>
                                                                    <div className="col-md-9 mb-md-0 p-md-4 d-flex flex-row">
                                                                        <div className="member-avatar"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br />
                                                            <div className="cards-2 d-flex justify-content-evenly align-items-center ">
                                                                <div className="card d-flex justify-content-evenly align-items-center rounded-4">
                                                                    <div className="col-md-9 mb-md-0 p-md-4 d-flex flex-row justify-content-center">
                                                                        <i className="fa-solid fa-earth-asia"></i>
                                                                    </div>
                                                                    <div className="card-body d-flex flex-column">
                                                                        <h5 className="card-title member-page-field">
                                                                            這裡說不定會放東西
                                                                        </h5>
                                                                        <button className="btn-member btn-member-pri btn-member-m btn-member-outline-light">
                                                                            開始預約
                                                                        </button>{' '}
                                                                    </div>
                                                                </div>
                                                                <div className="p-2">
                                                                    {' '}
                                                                </div>
                                                                <div className="card d-flex justify-content-evenly align-items-center rounded-4">
                                                                    <div className="col-md-9 mb-md-0 p-md-4 d-flex flex-row justify-content-center">
                                                                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                                                                    </div>
                                                                    <div className="card-body d-flex flex-column">
                                                                        <h5 className="card-title member-page-field">
                                                                            這裡說不定會放東西
                                                                        </h5>
                                                                        <button className="btn-member btn-member-sec btn-member-m btn-member-outline-light">
                                                                            開始創建
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </section>
                                            </div>
                                        </div>
                                    </section>
                                </section>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
}

export default MemberProfileForm;
