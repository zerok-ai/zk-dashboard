import HTTPDetails from './HTTPDetails';
import MySQLDetails from './MySQLDetails';
import { TraceDetailsProps } from './Components/TabBarUtils';
import ExceptionDetails from './ExceptionDetails';

const TraceDetailsSidebar = (props: TraceDetailsProps) => {
  switch (props.modalData?.type) {
    case 'HTTP':
      return <HTTPDetails modalData={props.modalData} />;
    case 'MYSQL':
      return <MySQLDetails modalData={props.modalData} />;
    case 'EXCEPTION':
      return <ExceptionDetails modalData={props.modalData} />;
    default:
      return <HTTPDetails modalData={props.modalData} />;
  }
};

export default TraceDetailsSidebar;
