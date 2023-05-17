import { Layout } from 'antd';
import AppBody from './components/AppBody';
import AppHeader from './components/AppHeader';
import './App.scss';

const App = () => {
	return <Layout className='main-layout'>
		<AppHeader />
		<AppBody />
	</Layout>
};

export default App;
