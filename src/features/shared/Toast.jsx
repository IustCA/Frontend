import { useSelector } from "react-redux";
import Icon from "../components/common/Icon";

export default function Toast() {
  const { toast } = useSelector((store) => store.app);

  if (toast) {
    return (
      <div className={"toast " + toast.type} role="status" aria-live="polite">
        <Icon name={toast.type === "ok" ? "circleCheck" : "alert"} size={16} />
        {toast.msg}
      </div>
    );
  } else return null;
}
