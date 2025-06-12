
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    if (theme === "system") {
      return actualTheme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
    }
    return theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
  }

  const getLabel = () => {
    if (theme === "system") {
      return `Sistema (${actualTheme === "dark" ? "Oscuro" : "Claro"})`
    }
    return theme === "dark" ? "Oscuro" : "Claro"
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={cycleTheme}
      className="gap-2"
    >
      {getIcon()}
      <span className="text-xs">{getLabel()}</span>
    </Button>
  )
}
