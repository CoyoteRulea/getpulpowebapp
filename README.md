# Getpulpowebapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## GetPulpo WebApp
### Run NestJS server

In order to test this web app please run the following steps (make sure you hace Node and NPM installed)
```
git clone https://github.com/CoyoteRulea/getpulpo.git
cd getpulpo
git checkout develop
npm run start:dev
```
Develop removes AuthGuard requirement on each request. I'm using session authorization for that API, and is working with POSTMAN (for example) where you need to call login before all methods are authorized to response. But seems like Angular (and others frontend frameworks) are not allowed to use connect.sid cookie and was imposible to add that in the request (not allowed because risky call).

To run this Front End App run 
```
ng serve
```

Main page call Login page, i just planned to use GlobalLoggedUser "global properties" to grant  in all site, but unfortunaly this value is deleted when refresh. Maybe i'm just need to save this in a cookie, but time goes so fast.

BTW,rest of pages are working without "authorization".

Finally, I also tried to add Jest Tunit test, but how you could find in the file \getpulpo\src\model\vehicles\vehicles.service.spec.ts i'm getting some errors trying to call that service.
