import { Layout } from 'antd';
import { AppBody, AppHeader } from './components';
import './App.scss';

const App = () => {
	return <Layout className='main-layout'>
		<AppHeader />
		<AppBody />
	</Layout>
};

export default App;
