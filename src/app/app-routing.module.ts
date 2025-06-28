import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { UnAuthGuard } from "./guards/un-auth.guard";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { 
    path: "", 
    redirectTo: "guarddashboard", 
    pathMatch: "full" 
  },

  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then(m => m.LoginPageModule),
    canActivate: [UnAuthGuard]
  },
  {
    path: 'guarddashboard',
    loadChildren: () => import('./page/guarddashboard/guarddashboard.module').then( m => m.GuarddashboardPageModule)
  },


];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: "reload", initialNavigation: "enabledBlocking" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
