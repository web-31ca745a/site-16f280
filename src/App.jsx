import { useState } from 'react';
import Layout from './components/layout/Layout';
import TabHome from './components/tabs/TabHome';
import TabApology from './components/tabs/TabApology';
import TabGrowth from './components/tabs/TabGrowth';
import TabLove from './components/tabs/TabLove';
import TabFuture from './components/tabs/TabFuture';
import TabChoice from './components/tabs/TabChoice';

function App() {
    const [activeTab, setActiveTab] = useState('home');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'home':
                return <TabHome />;
            case 'apology':
                return <TabApology />;
            case 'growth':
                return <TabGrowth />;
            case 'love':
                return <TabLove />;
            case 'future':
                return <TabFuture />;
            case 'choice':
                return <TabChoice />;
            default:
                return <TabHome />;
        }
    };

    return (
        <Layout activeTab={activeTab} onTabChange={setActiveTab}>
            {renderTabContent()}
        </Layout>
    );
}

export default App;
