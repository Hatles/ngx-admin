import {AdminAction} from './adminAction';

export class AdminActionGuard {
  canActivate(action: AdminAction);
}
