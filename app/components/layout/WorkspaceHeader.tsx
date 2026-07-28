import { Button } from "../ui/Button";
import { Download, Save } from "lucide-react";

export default function WorkspaceHeader() {
  return (
    <div className="flex justify-between items-center px-8 py-6 border-b border-neutral-200 bg-white">
      <h1 className="text-2xl font-bold text-neutral-900">
        Audit Planning Workspace
      </h1>

      <div className="flex gap-3">
        <Button variant="outline" size="md">
          <Download className="w-4 h-4" />
          Export
        </Button>
        <Button variant="primary" size="md">
          <Save className="w-4 h-4" />
          Save
        </Button>
      </div>
    </div>
  );
}
