import { useState } from 'react';
import { ChevronDown, ChevronRight, Menu as MenuIcon } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ menuTree, onSelectPage }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [selectedLink, setSelectedLink] = useState('/');
  const [isOpen, setIsOpen] = useState(true);

  const toggleNode = (nodeTitle) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeTitle)) {
      newExpanded.delete(nodeTitle);
    } else {
      newExpanded.add(nodeTitle);
    }
    setExpandedNodes(newExpanded);
  };

  const handleSelectNode = (node) => {
    setSelectedLink(node.link);
    onSelectPage(node);
  };

  const renderNode = (node, level = 0) => {
    const hasChildren = node.hasChildren();
    const isExpanded = expandedNodes.has(node.title);
    const isSelected = selectedLink === node.link;

    return (
      <div key={node.title} className="menu-item-container">
        <div
          className={`menu-item ${isSelected ? 'selected' : ''}`}
          style={{ paddingLeft: `${level * 20 + 16}px` }}
        >
          {hasChildren && (
            <button
              className="expand-button"
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.title);
              }}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
          
          <span
            className="menu-title"
            onClick={() => handleSelectNode(node)}
            style={{ marginLeft: hasChildren ? '0' : '24px' }}
          >
            {node.title}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div className="submenu">
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        <MenuIcon size={24} />
      </button>
      
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>📋 Navigation</h2>
        </div>
        
        <nav className="sidebar-nav">
          {menuTree.root.children.map(child => renderNode(child, 0))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;