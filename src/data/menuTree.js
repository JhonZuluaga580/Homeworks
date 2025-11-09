import NaryTree from '../models/NaryTree';
import NaryNode from '../models/NaryNode';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Products from '../pages/Products';
import Reports from '../pages/Reports';

export const createMenuTree = () => {
  // Crear el árbol con el nodo raíz
  const menuTree = new NaryTree('Main Menu', '/', Home);

  // Nivel 1: Dashboard
  const dashboardNode = new NaryNode('Dashboard', '/dashboard', Dashboard);
  menuTree.root.addChild(dashboardNode);

  // Nivel 1: Users (con submenús)
  const usersNode = new NaryNode('Users', '/users', Users);
  
  // Nivel 2: Submenús de Users
  const allUsersNode = new NaryNode('All Users', '/users/all', Users);
  const addUserNode = new NaryNode('Add User', '/users/add', Users);
  const userRolesNode = new NaryNode('User Roles', '/users/roles', Users);
  
  usersNode.addChild(allUsersNode);
  usersNode.addChild(addUserNode);
  usersNode.addChild(userRolesNode);
  
  menuTree.root.addChild(usersNode);

  // Nivel 1: Products (con submenús)
  const productsNode = new NaryNode('Products', '/products', Products);
  
  // Nivel 2: Submenús de Products
  const inventoryNode = new NaryNode('Inventory', '/products/inventory', Products);
  const categoriesNode = new NaryNode('Categories', '/products/categories', Products);
  const suppliersNode = new NaryNode('Suppliers', '/products/suppliers', Products);
  
  productsNode.addChild(inventoryNode);
  productsNode.addChild(categoriesNode);
  productsNode.addChild(suppliersNode);
  
  menuTree.root.addChild(productsNode);

  // Nivel 1: Reports (con submenús multinivel)
  const reportsNode = new NaryNode('Reports', '/reports', Reports);
  
  // Nivel 2: Submenús de Reports
  const salesReportsNode = new NaryNode('Sales', '/reports/sales', Reports);
  const financialReportsNode = new NaryNode('Financial', '/reports/financial', Reports);
  
  // Nivel 3: Submenús de Sales
  const dailySalesNode = new NaryNode('Daily Sales', '/reports/sales/daily', Reports);
  const monthlySalesNode = new NaryNode('Monthly Sales', '/reports/sales/monthly', Reports);
  
  salesReportsNode.addChild(dailySalesNode);
  salesReportsNode.addChild(monthlySalesNode);
  
  reportsNode.addChild(salesReportsNode);
  reportsNode.addChild(financialReportsNode);
  
  menuTree.root.addChild(reportsNode);

  // Nivel 1: Settings (con submenús)
  const settingsNode = new NaryNode('Settings', '/settings', Settings);
  
  // Nivel 2: Submenús de Settings
  const profileNode = new NaryNode('Profile', '/settings/profile', Profile);
  const securityNode = new NaryNode('Security', '/settings/security', Settings);
  const preferencesNode = new NaryNode('Preferences', '/settings/preferences', Settings);
  
  settingsNode.addChild(profileNode);
  settingsNode.addChild(securityNode);
  settingsNode.addChild(preferencesNode);
  
  menuTree.root.addChild(settingsNode);

  // Imprimir el árbol en consola
  console.log('\n🌳 ÁRBOL DE MENÚS CREADO\n');
  menuTree.printDFS();
  console.log('\n');
  menuTree.printBFS();

  return menuTree;
};