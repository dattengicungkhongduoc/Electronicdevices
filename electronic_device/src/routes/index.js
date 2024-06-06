import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";


export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isShowFooter: true
    },

    {
        path: '/orders',
        page: OrderPage,
        isShowHeader: true,
        isShowFooter: false
    },

    {
        path: '/product',
        page: ProductsPage,
        isShowHeader: true,
        isShowFooter: false
    },

    {
        path: '/:type',
        page: TypeProductPage,
        isShowHeader: true,
        isShowFooter: true
    },

    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false,
        isShowFooter: false
    },

    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false,
        isShowFooter: false
    },

    {
        path: '/product-detail',
        page: ProductDetailPage,
        isShowHeader: true,
        isShowFooter: true
    },

    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true,
        isShowFooter: true
    },

    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isShowFooter: false,
        isPrivate: true,
    },

    {
        path: '*',
        page: NotFoundPage
    }
]