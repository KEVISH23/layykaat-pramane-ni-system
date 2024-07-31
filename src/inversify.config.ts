import { Container } from 'inversify'
const container = new Container()
import { PERMISSIONTYPES, TYPES } from './constants'
import { AuthMiddleware, RetrievePermission, RoleMiddleware } from './middleware/'
import { SuperAdminService } from './services/superAdmin.service'
import { AuthService } from './services/auth.service'

//binding services

container.bind<SuperAdminService>(TYPES.SuperAdminService).to(SuperAdminService)
container.bind<AuthService>(TYPES.AuthService).to(AuthService)

//binding middlewares
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)
container.bind<RoleMiddleware>(TYPES.RoleMiddleware).to(RoleMiddleware)
container.bind<RetrievePermission>(TYPES.ReadPermission).toDynamicValue(()=>new RetrievePermission(PERMISSIONTYPES.READ)).inRequestScope()
container.bind<RetrievePermission>(TYPES.WritePermission).toDynamicValue(()=>new RetrievePermission(PERMISSIONTYPES.WRITE)).inRequestScope()
export { container }