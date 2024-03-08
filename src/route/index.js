import Home from "../views/Home";
import Shop from "../views/Shop";
import Featured from "../views/Featured";
import Recommended from "../views/Recommended";
import NotFound from "../views/NotFound";
import ProductDetail from "../views/ProductDetail";
import Signup from "../views/Signup";
import Signin from "../views/Signin";
import SearchResults from "../views/SearchResults";
import Account from "../views/Account";
import EditProfile from "../views/EditProfile";

const router = [
    {
        path: '/home',
        element: <Home />,
    },
    {
        path: '/shop',
        element: <Shop />
    },
    {
        path: '/featured',
        element: <Featured />
    },
    {
        index: true,
        element: <Featured />
    },
    {
        path: '/recommended',
        element: <Recommended />
    },
    {
        path: '/product/:productId',
        element: <ProductDetail />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/signin',
        element: <Signin />
    },
    {
        path: '/account',
        element: <Account />
    },
    {
        path: '/editprofile',
        element: <EditProfile />
    },
    {
        path: '/search',
        element: <SearchResults />
    },
    {
        path: '*',
        element: <NotFound />
    }
]

export default router