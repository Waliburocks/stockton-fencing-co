import React, { useState, useEffect } from 'react';
import { searchPhotos, getCuratedPhotos, generateAttribution, validateImageForFencing, getFencingSearchTerms, createDownloadBlob } from '../utils/pexels.js';
import '../styles/pexels-search.css';

const PexelsImageSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchOptions, setSearchOptions] = useState({
    orientation: '',
    size: '',
    color: ''
  });

  // Load curated photos on component mount
  useEffect(() => {
    loadCuratedPhotos();
  }, []);

  const loadCuratedPhotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCuratedPhotos(15, 1);
      setPhotos(data.photos);
      setTotalResults(data.total_results);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to load curated photos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (page = 1) => {
    if (!searchQuery.trim()) {
      loadCuratedPhotos();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await searchPhotos(searchQuery, {
        ...searchOptions,
        page,
        perPage: 15
      });
      
      if (page === 1) {
        setPhotos(data.photos);
      } else {
        setPhotos(prev => [...prev, ...data.photos]);
      }
      
      setTotalResults(data.total_results);
      setCurrentPage(page);
    } catch (err) {
      setError('Search failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    handleSearch(currentPage + 1);
  };

  const handleQuickSearch = (term) => {
    setSearchQuery(term);
    setCurrentPage(1);
    // Trigger search after state update
    setTimeout(() => handleSearch(1), 100);
  };

  const handlePhotoSelect = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleDownload = async (photo, size = 'large') => {
    try {
      const imageUrl = photo.src[size];
      const filename = `pexels-${photo.id}-${size}`;
      
      // Create download blob
      const downloadData = await createDownloadBlob(imageUrl, filename);
      
      // Create download link
      const link = document.createElement('a');
      link.href = downloadData.downloadUrl;
      link.download = downloadData.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up blob URL
      setTimeout(() => URL.revokeObjectURL(downloadData.downloadUrl), 100);
      
      // Show success message
      alert(`Downloaded: ${downloadData.filename}\n\nAttribution: ${generateAttribution(photo, 'text')}`);
    } catch (err) {
      alert('Download failed: ' + err.message);
    }
  };

  const copyAttribution = (photo, format = 'html') => {
    const attribution = generateAttribution(photo, format);
    navigator.clipboard.writeText(attribution).then(() => {
      alert('Attribution copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy attribution. Here it is:\n\n' + attribution);
    });
  };

  const suggestedTerms = getFencingSearchTerms();

  return (
    <div className="pexels-search-container">
      <div className="search-header">
        <h2>Pexels Image Search</h2>
        <p>Search and download high-quality images for your fencing website</p>
      </div>

      {/* Search Form */}
      <div className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for images (e.g., wooden fence, gate installation...)"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(1)}
            className="search-input"
          />
          <button onClick={() => handleSearch(1)} className="search-button">
            Search
          </button>
        </div>

        {/* Search Options */}
        <div className="search-options">
          <select
            value={searchOptions.orientation}
            onChange={(e) => setSearchOptions(prev => ({ ...prev, orientation: e.target.value }))}
            className="search-select"
          >
            <option value="">Any Orientation</option>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
            <option value="square">Square</option>
          </select>

          <select
            value={searchOptions.size}
            onChange={(e) => setSearchOptions(prev => ({ ...prev, size: e.target.value }))}
            className="search-select"
          >
            <option value="">Any Size</option>
            <option value="large">Large</option>
            <option value="medium">Medium</option>
            <option value="small">Small</option>
          </select>

          <select
            value={searchOptions.color}
            onChange={(e) => setSearchOptions(prev => ({ ...prev, color: e.target.value }))}
            className="search-select"
          >
            <option value="">Any Color</option>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="turquoise">Turquoise</option>
            <option value="blue">Blue</option>
            <option value="violet">Violet</option>
            <option value="pink">Pink</option>
            <option value="brown">Brown</option>
            <option value="black">Black</option>
            <option value="gray">Gray</option>
            <option value="white">White</option>
          </select>
        </div>

        {/* Quick Search Terms */}
        <div className="quick-search">
          <span className="quick-search-label">Quick searches:</span>
          {suggestedTerms.slice(0, 8).map((term) => (
            <button
              key={term}
              onClick={() => handleQuickSearch(term)}
              className="quick-search-button"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Results Count */}
      {totalResults > 0 && (
        <div className="results-info">
          Found {totalResults.toLocaleString()} images
        </div>
      )}

      {/* Photo Grid */}
      <div className="photos-grid">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onSelect={handlePhotoSelect}
            onDownload={handleDownload}
            onCopyAttribution={copyAttribution}
          />
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading images...</p>
        </div>
      )}

      {/* Load More Button */}
      {photos.length > 0 && photos.length < totalResults && !loading && (
        <div className="load-more">
          <button onClick={handleLoadMore} className="load-more-button">
            Load More Images
          </button>
        </div>
      )}

      {/* Photo Details Modal */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onDownload={handleDownload}
          onCopyAttribution={copyAttribution}
        />
      )}
    </div>
  );
};

// Individual Photo Card Component
const PhotoCard = ({ photo, onSelect, onDownload, onCopyAttribution }) => {
  const validation = validateImageForFencing(photo);
  
  return (
    <div className="photo-card">
      <div className="photo-image-container">
        <img
          src={photo.src.medium}
          alt={photo.alt || `Photo by ${photo.photographer}`}
          onClick={() => onSelect(photo)}
          className="photo-image"
        />
        <div className="photo-overlay">
          <button onClick={() => onSelect(photo)} className="view-button">
            View Details
          </button>
        </div>
      </div>
      
      <div className="photo-info">
        <div className="photo-meta">
          <span className="photographer">by {photo.photographer}</span>
          <span className="dimensions">{photo.width} × {photo.height}</span>
        </div>
        
        {validation.warnings.length > 0 && (
          <div className="validation-warnings">
            {validation.warnings.map((warning, index) => (
              <div key={index} className="warning-item">⚠️ {warning}</div>
            ))}
          </div>
        )}
        
        <div className="photo-actions">
          <button
            onClick={() => onDownload(photo, 'large')}
            className="download-button"
          >
            Download
          </button>
          <button
            onClick={() => onCopyAttribution(photo, 'html')}
            className="attribution-button"
          >
            Copy Attribution
          </button>
        </div>
      </div>
    </div>
  );
};

// Photo Details Modal Component
const PhotoModal = ({ photo, onClose, onDownload, onCopyAttribution }) => {
  const validation = validateImageForFencing(photo);
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Photo Details</h3>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        
        <div className="modal-body">
          <div className="modal-image-container">
            <img
              src={photo.src.large}
              alt={photo.alt || `Photo by ${photo.photographer}`}
              className="modal-image"
            />
          </div>
          
          <div className="modal-details">
            <div className="detail-group">
              <h4>Photo Information</h4>
              <p><strong>Photographer:</strong> {photo.photographer}</p>
              <p><strong>Dimensions:</strong> {photo.width} × {photo.height}</p>
              <p><strong>Aspect Ratio:</strong> {validation.aspectRatio}</p>
              <p><strong>ID:</strong> {photo.id}</p>
              {photo.alt && <p><strong>Alt Text:</strong> {photo.alt}</p>}
            </div>
            
            <div className="detail-group">
              <h4>Suggested Use</h4>
              <ul>
                {validation.suggestedUse.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
            </div>
            
            {validation.recommendations.length > 0 && (
              <div className="detail-group">
                <h4>Recommendations</h4>
                <ul>
                  {validation.recommendations.map((rec, index) => (
                    <li key={index} className="recommendation">✓ {rec}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {validation.warnings.length > 0 && (
              <div className="detail-group">
                <h4>Warnings</h4>
                <ul>
                  {validation.warnings.map((warning, index) => (
                    <li key={index} className="warning">⚠️ {warning}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="detail-group">
              <h4>Attribution</h4>
              <div className="attribution-formats">
                <div className="attribution-format">
                  <label>HTML:</label>
                  <code>{generateAttribution(photo, 'html')}</code>
                  <button onClick={() => onCopyAttribution(photo, 'html')}>Copy</button>
                </div>
                <div className="attribution-format">
                  <label>Text:</label>
                  <code>{generateAttribution(photo, 'text')}</code>
                  <button onClick={() => onCopyAttribution(photo, 'text')}>Copy</button>
                </div>
                <div className="attribution-format">
                  <label>Markdown:</label>
                  <code>{generateAttribution(photo, 'markdown')}</code>
                  <button onClick={() => onCopyAttribution(photo, 'markdown')}>Copy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <div className="download-options">
            <h4>Download Options</h4>
            <div className="download-buttons">
              {Object.entries(photo.src).map(([size, url]) => (
                <button
                  key={size}
                  onClick={() => onDownload(photo, size)}
                  className="download-size-button"
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PexelsImageSearch;