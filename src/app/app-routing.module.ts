import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { GeneralComponent } from "./general/general.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
    { path: "", component: AuthComponent },
    {
        path: "general",
        component: GeneralComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
