import { useContext, useEffect } from 'react';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

// scss
import './_mainpage.scss';

// imgs
import mainpagebg from './imgs/mainpage_bg_2.svg';
import mainpage_nav from './imgs/mainpage_nav.svg';
import mainpage_center_logo from './imgs/mainpage_center_logo.svg';
import avatar_star from './imgs/avatar_star.svg';
import member_star from './imgs/member_star.svg';
import go_future from './imgs/go_future.svg';
import time_decorate from './imgs/time_decorate.svg';
import time_map from './imgs/time_map.svg';
import back_to_center from './imgs/back_to_center.svg';

function MainPage(props) {
    // 原有MainPage code保留---------------------------
    const { pageName, setLightBox } = props;
    const { setHeader } = useContext(HeaderContext);
    const { authorized, sid, account, token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setHeader(headers[pageName]);
        startAtCenter();
    }, []);

    // -----------------------------------------------

    // FIXME: 目前手機板拖拉功能 no work
    // 背景地圖拖拉功能
    let mouseDown = false;
    let startX, scrollLeft;

    // 下面這個自己多加
    let startY, scrollTop;

    // 拖拉 function
    let startDragging = function (e) {
        const slider = document.querySelector('.xuan-parent'); //先觸發function之後再抓DOM
        mouseDown = true;
        console.log(e.pageX);
        startX = e.pageX - slider.offsetLeft;
        // 下面這個多加
        startY = e.pageY - slider.offsetTop;
        scrollLeft = slider.scrollLeft;
        // 下面這個多加
        scrollTop = slider.scrollTop;
    };

    // 停掉function
    let stopDragging = function (event) {
        mouseDown = false;
    };

    let mouseMove = function (e) {
        const slider = document.querySelector('.xuan-parent'); //先觸發function之後再抓DOM
        e.preventDefault();
        if (!mouseDown) {
            return;
        }
        const x = e.pageX - slider.offsetLeft;
        const scroll = x - startX;
        slider.scrollLeft = scrollLeft - scroll;

        const y = e.pageY - slider.offsetLeft;
        const scrolly = y - startY;
        slider.scrollTop = scrollTop - scrolly;
    };

    let backToCenter = function () {
        const element = document.getElementById('xuan-btn');
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
    };

    // 回到中心點 function
    const startAtCenter = function () {
        const element = document.getElementById('xuan-btn');
        element.scrollIntoView({
            behavior: 'instant',
            block: 'center',
            inline: 'center',
        });
    };

    return (
        <>
            {/* 固定都是100% 視窗畫面 */}
            <div className="xuan-parent">
                {/* 按了回中心點 */}
                <div
                    className="xuan-btn-center"
                    id="center"
                    style={{ textAlign: 'center' }}
                    onClick={backToCenter}
                >
                    <img src={back_to_center} alt="" />
                    <span className="xuan-subtitle">Back To Center</span>
                </div>

                {/* 按了開啟目錄頁 */}
                <div
                    className="xuan-mainpage-nav"
                    onClick={() => {
                        // alert('開啟目錄');
                        setLightBox('nav_lightbox_visible')
                    }}
                >
                    <img src={mainpage_nav} alt="" />
                </div>

                {/* 放主題小方塊 */}
                <div
                    className="xuan-child"
                    onMouseDown={startDragging}
                    onMouseUp={stopDragging}
                    onMouseLeave={stopDragging}
                    onMouseMove={mouseMove}
                >
                    {/* 中心方塊 */}
                    <div
                        className="xuan-child-center xuan-box"
                        id="xuan-btn"
                        onClick={() => {
                            navigate('#/', {
                                replace: true,
                            });
                        }}
                    >
                        <img src={mainpage_center_logo} alt="" />
                    </div>

                    {/* 背景裝飾圖 */}
                    <div className="xuan-mainpage-bg">
                        <img src={mainpagebg} alt="" />
                    </div>

                    {/* -------- 其他方塊 ---------- */}

                    {/* 轉生形象訂製 */}
                    <div
                        className="xuan-box xuan-box-avatar"
                        onClick={() => {
                            navigate('/showcase', {
                                replace: true,
                            });
                        }}
                    >
                        <p>轉生形象訂製</p>
                        <div>
                            <img src={avatar_star} alt="" />
                        </div>

                        {/* TODO: 放轉生形象圖 */}
                        <div></div>
                    </div>

                    {/* 會員中心 */}
                    <div
                        className="xuan-box xuan-box-member"
                        onClick={() => {
                            navigate('/login', {
                                replace: true,
                            });
                        }}
                    >
                        <div>
                            <img src={member_star} alt="" />
                            <p>會員中心</p>
                        </div>

                        {/* TODO: 放會員相關圖片 */}
                        <div></div>
                    </div>

                    {/* 投胎去！ */}
                    <div
                        className="xuan-box xuan-go-future"
                        onClick={() => {
                            navigate('/login', {
                                replace: true,
                            });
                        }}
                    >
                        <img src={go_future} alt="" />
                    </div>

                    {/* 良辰吉地 */}
                    <div
                        className="xuan-box xuan-time"
                        onClick={() => {
                            navigate('/Place', {
                                replace: true,
                            });
                        }}
                    >
                        <div>
                            <p>良辰吉地</p>
                            <img src={time_decorate} alt="" />
                        </div>

                        <div>
                            <img src={time_map} alt="" />
                        </div>
                    </div>

                    {/* 功德撲滿 */}
                    <div
                        className="xuan-box xuan-box-event"
                        onClick={() => {
                            navigate('/events', {
                                replace: true,
                            });
                        }}
                    >
                        <p>功德撲滿</p>
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;
