import type { ModuleSummary } from '../../types/module';
import { moduleSummaries } from '../data/moduleSummaries';

const delay = <T>(value: T, ms = 220): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(value), ms));

export const moduleService = {
  getSummary: async (moduleId: string): Promise<ModuleSummary> => {
    return delay(moduleSummaries[moduleId] ?? {});
  },
};
