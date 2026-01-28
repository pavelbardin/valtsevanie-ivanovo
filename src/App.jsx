import Contacts from "./components/Contacts";
import CooperationSteps from "./components/CooperationSteps";
import CountPrice from "./components/CountPrice";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HistoryBlock from "./components/HistoryBlock";
import Kviz from "./components/Kviz";
import OurWorks from "./components/OurWorks";
import ProjectBlock from "./components/ProjectBlock";
import QABlock from "./components/QABlock";
import QualityBlock from "./components/QualityBlock";
import ValzProcess from "./components/ValzProcess";
import WelcomeBlock from "./components/WelcomeBlock";
import YouCanOrdetBlock from "./components/YouCanOrdetBlock";
import CallBack from "./components/СallBack";
import { ModalProvider } from "./components/ModalContext";

function App() {
  return (
    <ModalProvider>
      <div>
        <Header />
        <WelcomeBlock />
        <QualityBlock />
        <YouCanOrdetBlock />
        <OurWorks/>
        <Kviz />
        <ValzProcess />
        <HistoryBlock />
        <ProjectBlock />
        <CooperationSteps />
        <QABlock />
        <Contacts />
        <CallBack />
        <Footer />
      </div>
    </ModalProvider>
  );
}

export default App;
