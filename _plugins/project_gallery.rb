# Liquid filters to pull structured data out of the project posts:
# - gallery_images: every /assets/images/projects/... path referenced in the content
# - project_prose:  the content before the "GALLERIA IMMAGINI" heading
module ProjectGallery
  GALLERY_HEADING = /(?:^###\s*\**\s*GALLERIA IMMAGINI|<h3[^>]*>\s*(?:<strong>\s*)?GALLERIA IMMAGINI)/i
  IMAGE_PATH = %r{/assets/images/projects/[^)"'\s]+\.(?:jpe?g|png)}i

  def gallery_images(content)
    return [] if content.nil?
    content.to_s.scan(IMAGE_PATH).uniq
  end

  def project_prose(content)
    return "" if content.nil?
    prose = content.to_s.split(GALLERY_HEADING, 2).first || ""
    # strip the trailing separator before the gallery heading (markdown --- or rendered <hr>)
    prose.sub(/(?:^-{3,}\s*|<hr\s*\/?>\s*)\z/i, "").strip
  end
end

Liquid::Template.register_filter(ProjectGallery)
