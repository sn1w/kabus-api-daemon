import { KabusApiDaemon } from "./src/kabus_api_daemon";
import { HoldSymbol, NonHoldSymbol } from "./symbols";

const daemon = new KabusApiDaemon(
    [], 1.05
)

daemon.start()