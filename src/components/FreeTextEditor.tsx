interface FreeTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const FreeTextEditor = ({ value, onChange }: FreeTextEditorProps) => {
  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer here..."
        className="w-full min-h-[100px] px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y bg-neutral-50"
      />
    </div>
  );
};

