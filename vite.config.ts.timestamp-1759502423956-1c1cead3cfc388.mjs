// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig(({ command, mode }) => {
  const isStackBlitz = process.env.STACKBLITZ === "true" || process.env.NODE_ENV === "stackblitz";
  const isGitHubPages = mode === "github" || mode === "production";
  let base = "./";
  if (command === "build" && isGitHubPages && !isStackBlitz) {
    base = "/boltnew/";
  }
  return {
    plugins: [react()],
    base,
    optimizeDeps: {
      exclude: ["lucide-react"]
    },
    server: {
      port: 3e3,
      host: true
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gIC8vIERldGVjdCBlbnZpcm9ubWVudFxuICBjb25zdCBpc1N0YWNrQmxpdHogPSBwcm9jZXNzLmVudi5TVEFDS0JMSVRaID09PSAndHJ1ZScgfHwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdzdGFja2JsaXR6J1xuICBjb25zdCBpc0dpdEh1YlBhZ2VzID0gbW9kZSA9PT0gJ2dpdGh1YicgfHwgbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nXG4gIFxuICAvLyBEZXRlcm1pbmUgYmFzZSBwYXRoXG4gIGxldCBiYXNlID0gJy4vJ1xuICBpZiAoY29tbWFuZCA9PT0gJ2J1aWxkJyAmJiBpc0dpdEh1YlBhZ2VzICYmICFpc1N0YWNrQmxpdHopIHtcbiAgICBiYXNlID0gJy9ib2x0bmV3LydcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW3JlYWN0KCldLFxuICAgIGJhc2UsXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiAzMDAwLFxuICAgICAgaG9zdDogdHJ1ZVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFFakQsUUFBTSxlQUFlLFFBQVEsSUFBSSxlQUFlLFVBQVUsUUFBUSxJQUFJLGFBQWE7QUFDbkYsUUFBTSxnQkFBZ0IsU0FBUyxZQUFZLFNBQVM7QUFHcEQsTUFBSSxPQUFPO0FBQ1gsTUFBSSxZQUFZLFdBQVcsaUJBQWlCLENBQUMsY0FBYztBQUN6RCxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxJQUNqQjtBQUFBLElBQ0EsY0FBYztBQUFBLE1BQ1osU0FBUyxDQUFDLGNBQWM7QUFBQSxJQUMxQjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
