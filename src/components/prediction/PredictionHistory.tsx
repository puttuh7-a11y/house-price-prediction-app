import React from "react";
import Card from "../ui/Card";
import type { PredictionResult } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import { Trash2 } from "lucide-react"; // 🗑 import delete icon

interface PredictionHistoryProps {
  predictions: PredictionResult[];
  onSelect: (prediction: PredictionResult) => void;
  onDelete?: (id: string) => void; // ✅ new prop for delete handler
}

const PredictionHistory: React.FC<PredictionHistoryProps> = ({
  predictions,
  onSelect,
  onDelete,
}) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-blue">History</h3>
        <div className="text-sm text-gray-700 dark:text-gray-600">
          {predictions.length} saved
        </div>
      </div>

      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {predictions.length === 0 ? (
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            No predictions yet — run one above.
          </div>
        ) : (
          predictions.map((prediction) => (
            <div
              key={prediction.id}
              className="flex justify-between items-center p-3 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <button
                onClick={() => onSelect(prediction)}
                className="text-left flex-1"
              >
                <div className="text-sm font-medium text-gray-900 dark:text-blue">
                  {formatCurrency(prediction.predictedPrice)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {new Date(prediction.createdAt).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-500">
                  {(prediction.confidence).toFixed(1)}%
                </div>
              </button>

              {/* 🗑 Delete button */}
              {onDelete && (
                <button
                  onClick={() => onDelete(prediction.id)}
                  className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900 transition"
                  title="Delete prediction"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default PredictionHistory;
