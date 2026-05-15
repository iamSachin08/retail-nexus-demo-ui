import { moduleService } from '../mock/services/moduleService';
import { useAsyncResource } from './useAsyncResource';

export const useModuleSummary = (moduleId: string) => {
  return useAsyncResource(() => moduleService.getSummary(moduleId), [moduleId]);
};
