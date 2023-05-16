import './App.scss';
import { Layout } from 'antd';
import { AppHeader } from './components/AppHeader';
import { MainContentLayout } from './components/mainContent/MainContentLayout';

const App = () => {
	return <Layout className='main-layout'>
		<AppHeader />
		<MainContentLayout />
	</Layout>
};

export default App;
