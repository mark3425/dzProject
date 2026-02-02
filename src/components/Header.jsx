import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { openPopup } from '../store/formSlice'
import DesktopMenu from './Navigation/DesktopMenu.jsx'
import MobileMenu from './Navigation/MobileMenu.jsx'
import './Header.css'
import Logo from "./assets/drupal-coder.svg"
const Header = () => {
    const dispatch = useDispatch()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleContactClick = (e) => {
        const rect = e.target.getBoundingClientRect()
        dispatch(openPopup({ buttonPosition: rect }))
    }

    return (
        <header className="header" style={{background: "transparent"}}>
            <div className="container">
                <div className="header-content" style={{justifyContent:"flex-start"}}>
                    <div className="logo" style={{marginRight:"10px"}}>
                    <img src={Logo} width={190}/>
                    </div>

                    <DesktopMenu />

                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        ☰
                    </button>
                </div>
            </div>

            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </header>
    )
}

export default Header