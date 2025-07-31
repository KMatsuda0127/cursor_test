import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  saveConfig,
  loadConfig,
  resetConfig,
  DEFAULT_CONFIG,
} from '@/utils/storage';

// localStorageのモック
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// chrome APIのモック
const chromeMock = {
  storage: {
    local: {
      get: vi.fn(),
      set: vi.fn(),
    },
  },
};

Object.defineProperty(window, 'chrome', {
  value: chromeMock,
  writable: true,
});

describe('Storage Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('saveConfig', () => {
    it('should save config to chrome storage when available', async () => {
      const config = {
        searchText: 'test',
        highlightColor: '#ff0000',
        isEnabled: true,
      };

      await saveConfig(config);

      expect(chromeMock.storage.local.set).toHaveBeenCalledWith({
        spotlightConfig: config,
      });
    });

    it('should save config to localStorage when chrome storage is not available', async () => {
      // chrome APIを無効化
      Object.defineProperty(window, 'chrome', {
        value: undefined,
        writable: true,
      });

      const config = {
        searchText: 'test',
        highlightColor: '#ff0000',
        isEnabled: true,
      };

      await saveConfig(config);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'spotlightConfig',
        JSON.stringify(config)
      );

      // chrome APIを復元
      Object.defineProperty(window, 'chrome', {
        value: chromeMock,
        writable: true,
      });
    });
  });

  describe('loadConfig', () => {
    it('should load config from chrome storage when available', async () => {
      const config = {
        searchText: 'test',
        highlightColor: '#ff0000',
        isEnabled: true,
      };
      chromeMock.storage.local.get.mockResolvedValue({
        spotlightConfig: config,
      });

      const result = await loadConfig();

      expect(result).toEqual(config);
      expect(chromeMock.storage.local.get).toHaveBeenCalledWith(
        'spotlightConfig'
      );
    });

    it('should return default config when chrome storage is empty', async () => {
      chromeMock.storage.local.get.mockResolvedValue({});

      const result = await loadConfig();

      expect(result).toEqual(DEFAULT_CONFIG);
    });

    it('should load config from localStorage when chrome storage is not available', async () => {
      // chrome APIを無効化
      Object.defineProperty(window, 'chrome', {
        value: undefined,
        writable: true,
      });

      const config = {
        searchText: 'test',
        highlightColor: '#ff0000',
        isEnabled: true,
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(config));

      const result = await loadConfig();

      expect(result).toEqual(config);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('spotlightConfig');

      // chrome APIを復元
      Object.defineProperty(window, 'chrome', {
        value: chromeMock,
        writable: true,
      });
    });

    it('should return default config when localStorage is empty', async () => {
      // chrome APIを無効化
      Object.defineProperty(window, 'chrome', {
        value: undefined,
        writable: true,
      });

      localStorageMock.getItem.mockReturnValue(null);

      const result = await loadConfig();

      expect(result).toEqual(DEFAULT_CONFIG);

      // chrome APIを復元
      Object.defineProperty(window, 'chrome', {
        value: chromeMock,
        writable: true,
      });
    });
  });

  describe('resetConfig', () => {
    it('should reset config to default values', async () => {
      await resetConfig();

      expect(chromeMock.storage.local.set).toHaveBeenCalledWith({
        spotlightConfig: DEFAULT_CONFIG,
      });
    });
  });
});
