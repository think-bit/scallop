import HomeView from '@/views/HomeView.vue'
import OfficerHomeView from '@/views/OfficerHomeView.vue'
import WineSearchView from '@/views/WineSearchView.vue';
import CartItemView from '@/views/CartItemView.vue'
import RegisterView from '@/views/RegisterView.vue'
import VerifyEmailView from '@/views/VerifyEmailView.vue'
import ImportLiquorView from '@/views/ImportLiquorView.vue'
import ScanQRView from '@/views/ScanQRView.vue';
import ImportWineListView from '@/views/ImportWineListView.vue'
import WineListView from '@/views/WineListView.vue'
import EditWineListView from '@/views/EditWineListView.vue'
import WineListInCart from '@/views/WineListInCartView.vue'
import ImportWineListInCart from '@/views/ImportWineListInCartView.vue'
import CheckWineByUpload from '@/views/CheckWineByUploadView.vue'
import PdfView from '@/views/PdfView.vue'
import LoginView from '@/views/LoginView.vue'

import {createRouter, createWebHistory} from 'vue-router' 

const routes = [
    {
        path : '/',
        // name: 'wine-search',
        component: HomeView,
        children: [
            {
                path: '',
                name: 'wine-search',
                component: WineSearchView,
            },
            {
                path: 'your-cart',
                name: 'your-cart',
                component: CartItemView,
            },
            {
                path: 'register',
                name: 'register',
                component: RegisterView,
            },
            {
                path: 'verify-email',
                name: 'verify-email',
                component: VerifyEmailView,
            },
            {
                path: 'import-liquor',
                name: 'import-liquor',
                component: ImportLiquorView,
            },
            {
                path: 'wine-list',
                name: 'wine-list',
                component: WineListView,
            },
            {
                path: 'scan-qr',
                name: 'scan-qr',
                component: ScanQRView,
            },
            {
                path: 'wine-list-in-cart',
                name: 'wine-list-in-cart',
                component: WineListInCart,
            },
        ],
        meta: { requiresUser: true }
    },
    {
        // This path is for admin. When usertypeId == 21, these paths can be go
        path: '/import-wine-list',
        component: OfficerHomeView,
        children: [
            {
                path: '',
                name: 'import-wine-list',
                component: ImportWineListView,
            },
            {
                path: 'edit-wine-list',
                name: 'edit-wine-list',
                component: EditWineListView,
            },
            {
                path: 'import-wine-list-in-cart',
                name: 'import-wine-list-in-cart',
                component: ImportWineListInCart,
            },
            {
                path: 'check-wine-by-upload',
                name: 'check-wine-by-upload',
                component: CheckWineByUpload,
            },
        ],
        meta: { requiresAdmin: true }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/pdf-view',
        name: 'pdf-view',
        component: PdfView,
        meta: { requiresUser: true }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userTypeId = localStorage.getItem('userTypeId');

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (isLoggedIn && userTypeId === '21') {
            next();
        } else {
            next({ path: '/' });
        }
    } else if (to.matched.some(record => record.meta.requiresUser)) {
        if (isLoggedIn && userTypeId !== '21') {
          next();
        } else {
          next({ path: '/import-wine-list' });
        }
    } else {
        next();
    }
});

export default router;