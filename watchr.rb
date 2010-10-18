def js_command(command)
  "-e 'do JavaScript \"#{command}\" in first document'"
end

def reload
  js_command("window.location.reload();")
end

def scroll
  js_command("window.scrollTo(0, document.body.scrollHeight);")
end

def safari_cmd(*cmds)
  "osascript -e 'tell app \"Safari\"' #{cmds.join(' ')} -e 'end tell'"
end

def reload_and_scroll
  safari_cmd reload, scroll
end

def scroll_to_bottom
  safari_cmd scroll
end

def run_it(command = scroll_to_bottom)
  system("ps -xc|grep -sq Safari && #{command}")
end

system("rake jasmine &")
system("open /Applications/Safari.app http://localhost:8888")

run_it

['public/javascripts/.*\.js', 'spec/javascripts/.*\.js'].each {|path|
  watch( path ) { run_it(reload_and_scroll) }
}
