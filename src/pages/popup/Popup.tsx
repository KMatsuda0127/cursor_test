import { useState, useEffect } from 'react';
import { loadConfig, saveConfig } from '@/utils/storage';
import type { SpotlightConfig } from '@/types/spotlight';

const Popup: React.FC = () => {
  const [config, setConfig] = useState<SpotlightConfig>({
    searchText: '',
    highlightColor: '#ffff00',
    isEnabled: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeConfig = async () => {
      try {
        const savedConfig = await loadConfig();
        setConfig(savedConfig);
      } catch (error) {
        console.error('Failed to load config:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeConfig();
  }, []);

  const handleConfigChange = async (updates: Partial<SpotlightConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);

    try {
      await saveConfig(newConfig);

      // Content scriptに設定を送信
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tab.id) {
        await chrome.tabs.sendMessage(tab.id, {
          type: 'UPDATE_CONFIG',
          data: newConfig,
        });
      }
    } catch (error) {
      console.error('Failed to save config:', error);
    }
  };

  const handleSearchTextChange = (searchText: string) => {
    handleConfigChange({ searchText });
  };

  const handleColorChange = (highlightColor: string) => {
    handleConfigChange({ highlightColor });
  };

  const handleToggleEnabled = () => {
    handleConfigChange({ isEnabled: !config.isEnabled });
  };

  const handleReset = async () => {
    setConfig({
      searchText: '',
      highlightColor: '#ffff00',
      isEnabled: false,
    });

    try {
      await saveConfig({
        searchText: '',
        highlightColor: '#ffff00',
        isEnabled: false,
      });
    } catch (error) {
      console.error('Failed to reset config:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="popup-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="popup-container">
      <h2>Spotlight Extension</h2>

      <div className="form-group">
        <label htmlFor="searchText">Search Text:</label>
        <input
          id="searchText"
          type="text"
          value={config.searchText}
          onChange={(e) => handleSearchTextChange(e.target.value)}
          placeholder="Enter text to highlight..."
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="highlightColor">Highlight Color:</label>
        <input
          id="highlightColor"
          type="color"
          value={config.highlightColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="color-input"
        />
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={config.isEnabled}
            onChange={handleToggleEnabled}
            className="checkbox"
          />
          Enable Spotlight
        </label>
      </div>

      <div className="button-group">
        <button onClick={handleReset} className="reset-button" type="button">
          Reset
        </button>
      </div>

      <div className="status">
        Status: {config.isEnabled ? 'Enabled' : 'Disabled'}
      </div>
    </div>
  );
};

export default Popup;
