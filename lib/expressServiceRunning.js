import expressServiceRunningTools from './expressServiceRunningTools';
import services from './services';

const tools = expressServiceRunningTools(services);

export const makeServiceRunner   = tools.makeServiceRunner;
export const runService          = tools.runService;
export const returnErrorResponse = tools.returnErrorResponse;
