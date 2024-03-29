import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "preformatted",
    children: [
      {
        path: "",
        loadChildren: () =>
          import('./pages/preformatted/preformatted.module').then( m => m.PreformattedPageModule)
      },
      {
        path: "product",
        loadChildren: () =>
          import("./pages/product/product.module").then(
            (m) => m.ProductPageModule
          ),
      },
    ],
  },
  {
    path: "products",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/products/products.module").then(
            (m) => m.ProductsPageModule
          ),
      },
      {
        path: "product",
        loadChildren: () =>
          import("./pages/product/product.module").then(
            (m) => m.ProductPageModule
          ),
      },
    ],
  },
  {
    path: "home",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/home/home.module").then((m) => m.HomePageModule),
      },
      {
        path: "product",
        loadChildren: () =>
          import("./pages/product/product.module").then(
            (m) => m.ProductPageModule
          ),
      },
      {
        path: "flyer",
        loadChildren: () => import('./pages/flyer/flyer.module').then( m => m.FlyerPageModule)
      },
      {
        path: 'category',
        children: [
          {
            path: "",
            loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
          },
          {
            path: "product",
            loadChildren: () => import("./pages/product/product.module").then((m) => m.ProductPageModule),
          },
        ],
      },
    ],
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./pages/settings/settings.module").then(
        (m) => m.SettingsPageModule
      ),
  },
  {
    path: "orders",
    loadChildren: () =>
      import("./pages/orders/orders.module").then((m) => m.OrdersPageModule),
  },
  {
    path: "orders",
    children: [
      {
        path: "",
        loadChildren: () =>
        import("./pages/orders/orders.module").then((m) => m.OrdersPageModule),
      },
      {
        path: "order/:index",
        loadChildren: () => import('./pages/order/order.module').then( m => m.OrderPageModule),
      },
    ],
  },
  {
    path: "favorites",
    children: [
      {
        path: "",
        loadChildren: () =>
        import("./pages/favorites/favorites.module").then(
          (m) => m.FavoritesPageModule
        )
      },
      {
        path: "product",
        loadChildren: () => import("./pages/product/product.module").then((m) => m.ProductPageModule),
      },
    ],
  },
  {
    path: "cart",
    loadChildren: () =>
      import("./modals/cart/cart.module").then((m) => m.CartPageModule),
  },
  {
    path: "flyer",
    loadChildren: () =>
      import("./modals/flyer/flyer.module").then((m) => m.FlyerPageModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'login',
    children: [
      {
        path: "",
        loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
      },
    ],
  },
  {
    path: 'categories',
    children: [
      {
        path: "",
        loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
      },
      {
        path: "category",
        children: [
          {
            path: "",
            loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
          },
          {
            path: "product",
            loadChildren: () => import("./pages/product/product.module").then((m) => m.ProductPageModule),
          },
        ],
      },
    ],
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
